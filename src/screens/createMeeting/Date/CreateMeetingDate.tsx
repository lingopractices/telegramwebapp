import React, { useCallback, useEffect, useMemo, useState } from 'react';

import DatePicker from '@components/DatePicker/DatePicker';
import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { useBackSwipe } from '@hooks/use-swipe';
import { setNotificationAction } from '@store/app-notifications/actions';
import { getAvailableTimes } from '@utils/date-utils';
import { DAY_MONTH_YAER } from 'common/constants';
import dayjs, { Dayjs } from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CREATE_DATE_PATH,
  CREATE_TIME_PATH,
  CREATE_PARTICIPANTS_PATH,
} from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

import styles from './CreateMeetingDate.module.scss';

const CreateMeetingDate: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const [meetingDate, setMeetingDate] = useState<Dayjs | null>(meetingData.date?.meetingDate);
  const setNotification = useActionWithDispatch(setNotificationAction);
  const { setBackButtonOnClick } = useTgBackButton(true);

  const availibleTimes = useMemo(() => {
    if (meetingDate) {
      return getAvailableTimes(meetingDate);
    }

    return [];
  }, [meetingDate]);

  const handleChangeDate = useCallback(
    (date: Dayjs | null) => {
      if (!date && !availibleTimes.length) {
        setNotification({
          id: dayjs().unix(),
          type: TooltipType.INFO,
          text: t('time.anotherTime'),
        });
        setMeetingDate(dayjs());

        return;
      }

      setMeetingDate(date);

      setMeetingData((prev) => ({
        ...prev,
        date: {
          meetingDate: date,
          data: {
            path: CREATE_DATE_PATH,
            title: t('meetingInfo.date'),
            value: dayjs(date).format(DAY_MONTH_YAER),
          },
        },
      }));
    },
    [availibleTimes.length, setMeetingDate, setNotification, t],
  );

  const handleBack = useCallback(() => {
    navigate(CREATE_PARTICIPANTS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useBackSwipe(handleBack);

  const handleSubmit = useCallback(() => {
    navigate(CREATE_TIME_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <StepBox meetingData={meetingData} containerClass={styles.stepBoxContainer} />
      <DatePicker defaultDate={meetingDate} onChangeDate={handleChangeDate} />
      <SubmitButton
        title={t(meetingDate ? 'button.continue' : 'date.choose')}
        onClick={handleSubmit}
        isActive={!!meetingDate}
      />
    </div>
  );
};

export default CreateMeetingDate;
