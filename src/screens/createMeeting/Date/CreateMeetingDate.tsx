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
  const location = useLocation();
  const meetingData: CreateMeetingType = location?.state;
  const [meetingDate, setMeetingDate] = useState<Dayjs | null>(
    meetingData.date?.meetingDate || dayjs(),
  );
  const setNotification = useActionWithDispatch(setNotificationAction);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setBackButtonOnClick } = useTgBackButton(true);

  const availibleTimes = useMemo(() => {
    if (meetingDate) {
      return getAvailableTimes(dayjs(meetingDate));
    }
    return [];
  }, [meetingDate]);

  const locationDate = useMemo(() => {
    if (meetingDate) {
      return {
        ...meetingData,
        date: {
          meetingDate,
          data: {
            path: CREATE_DATE_PATH,
            title: t('meetingInfo.date'),
            value: dayjs(meetingDate).format(DAY_MONTH_YAER),
          },
        },
      };
    }

    return meetingData;
  }, [meetingDate, meetingData, t]);

  const handleBack = useCallback(() => {
    navigate(CREATE_PARTICIPANTS_PATH, { state: { ...locationDate } });
  }, [locationDate, navigate]);

  useBackSwipe(handleBack);

  const handleSubmit = useCallback(() => {
    if (!availibleTimes.length) {
      setNotification({
        id: dayjs().unix(),
        type: TooltipType.INFO,
        text: t('date.anotherDate'),
      });
      setMeetingDate(dayjs());

      return;
    }
    navigate(CREATE_TIME_PATH, { state: { ...locationDate } });
  }, [availibleTimes.length, locationDate, navigate, setNotification, t]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <StepBox meetingData={locationDate} containerClass={styles.stepBoxContainer} />
      <DatePicker defaultDate={meetingDate} onChangeDate={setMeetingDate} />
      <SubmitButton
        title={t(meetingDate && availibleTimes.length ? 'button.continue' : 'date.choose')}
        onClick={handleSubmit}
        isActive={!!meetingDate && !!availibleTimes.length}
      />
    </div>
  );
};

export default CreateMeetingDate;
