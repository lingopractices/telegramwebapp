import React, { useCallback, useEffect, useMemo, useState } from 'react';

import DatePicker from '@components/DatePicker/DatePicker';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { setNotificationAction } from '@store/notifications/actions';
import { getAvailableTimes } from '@utils/date-utils';
import dayjs, { Dayjs } from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_PARTICIPANTS_PATH, CREATE_TIME_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingDate: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const [meetingDate, setMeetingDate] = useState<Dayjs | null>(meetingData.meetingDate || dayjs());
  const setNotification = useActionWithDispatch(setNotificationAction);
  const { setBackButtonOnClick } = useTgBackButton(true);

  useEffect(() => {
    setMeetingData((prev) => ({ ...prev, meetingDate }));
  }, [meetingDate, setMeetingData]);

  const handleBack = useCallback(() => {
    navigate(CREATE_PARTICIPANTS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const availibleTimes = useMemo(() => {
    if (meetingDate) {
      return getAvailableTimes(meetingDate);
    }

    return [];
  }, [meetingDate]);

  const handleForward = useCallback(() => {
    if (meetingDate && !availibleTimes.length) {
      setNotification({
        id: dayjs().unix(),
        type: TooltipType.INFO,
        text: t('time.anotherTime'),
      });
      setMeetingDate(dayjs());

      return;
    }

    navigate(CREATE_TIME_PATH, { state: { meetingData } });
  }, [
    meetingData,
    meetingDate,
    availibleTimes.length,
    navigate,
    setMeetingDate,
    setNotification,
    t,
  ]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <DatePicker defaultDate={meetingDate} onChangeDate={setMeetingDate} />
      <SubmitButton
        onClick={handleForward}
        title={meetingDate ? t('button.submit') : t('date.choose')}
        isActive={!!meetingDate}
      />
    </>
  );
};

export default CreateMeetingDate;
