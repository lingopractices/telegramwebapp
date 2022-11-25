import React, { useCallback, useEffect, useState } from 'react';

import DatePicker from '@components/DatePicker/DatePicker';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import {
  clearMeetingsAction,
  getMeetingDaysAction,
  getMeetingsAction,
} from '@store/meetings/actions';
import { getMeetingDaysPendingSelector, getMeetingsDaysSelector } from '@store/meetings/selectors';
import { setNotificationAction } from '@store/notifications/actions';
import { getMaxTimeOfDay, getMinTimeOfDay } from '@utils/date-utils';
import { DAY_MONTH_YAER, FULL_DATE } from 'common/constants';
import dayjs, { Dayjs } from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { JOIN_LEVELS_PATH, JOIN_MEETINGS_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

const JoinMeetingDate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [meetingData, setMeetingData] = useState<JoinMeetingType>(location?.state?.meetingData);
  const meetingsDays = useSelector(getMeetingsDaysSelector);
  const pendingLoadDays = useSelector(getMeetingDaysPendingSelector);
  const getMeetings = useActionWithDeferred(getMeetingsAction);
  const getMeetingsDays = useActionWithDeferred(getMeetingDaysAction);
  const clearMeetings = useActionWithDispatch(clearMeetingsAction);
  const { t } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);

  const { setBackButtonOnClick } = useTgBackButton(true);

  const handleChangeDate = useCallback(
    (value: Dayjs | null) => {
      let resultDate: Dayjs;
      if (value) {
        if (value.isToday()) {
          resultDate = value;
        } else {
          resultDate = getMinTimeOfDay(value);
        }

        setMeetingData((prev) => ({ ...prev, from: resultDate }));

        if (meetingData?.from) {
          if (value.format(DAY_MONTH_YAER) !== meetingData.from.format(DAY_MONTH_YAER)) {
            clearMeetings();
          }
        }
      } else {
        setMeetingData((prev) => ({ ...prev, from: value }));
      }
    },
    [meetingData?.from, setMeetingData, clearMeetings],
  );

  const handleBack = useCallback(() => {
    navigate(JOIN_LEVELS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(JOIN_MEETINGS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleSubmit = useCallback(() => {
    if (meetingData?.languageId && meetingData?.from && meetingData?.languageLevel) {
      getMeetings({
        languageId: meetingData.languageId,
        languageLevel: meetingData.languageLevel,
        from: meetingData.from,
        to: getMaxTimeOfDay(meetingData.from),
      })
        .then(() => {
          handleForward();
        })
        .catch(() =>
          setNotification({
            id: dayjs().unix(),
            type: TooltipType.ERROR,
            text: t('errors.loadMeetings'),
          }),
        );
    }
  }, [
    meetingData?.languageLevel,
    meetingData?.languageId,
    meetingData?.from,
    handleForward,
    getMeetings,
    setNotification,
    t,
  ]);

  const loadDays = useCallback(
    (date: Dayjs) => {
      if (meetingData?.languageId && meetingData?.languageLevel && date) {
        getMeetingsDays({
          languageId: meetingData.languageId,
          languageLevel: meetingData.languageLevel,
          from: date.format(FULL_DATE),
        }).catch(() =>
          setNotification({
            id: dayjs().unix(),
            type: TooltipType.ERROR,
            text: t('errors.loadDyays'),
          }),
        );
      }
    },
    [meetingData?.languageId, meetingData?.languageLevel, getMeetingsDays, setNotification, t],
  );

  useEffect(() => loadDays(dayjs()), [loadDays]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <DatePicker
        onChangeMonth={loadDays}
        defaultDate={meetingData?.from}
        availableDays={meetingsDays}
        onChangeDate={handleChangeDate}
      />
      <SubmitButton
        onClick={handleSubmit}
        title={meetingData?.from ? t('button.submit') : t('date.choose')}
        isActive={!!meetingData?.from}
        loading={pendingLoadDays}
      />
    </>
  );
};

export default JoinMeetingDate;
