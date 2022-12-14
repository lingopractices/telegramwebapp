import React, { useCallback, useEffect, useMemo, useState } from 'react';

import DatePicker from '@components/DatePicker/DatePicker';
import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { useBackSwipe } from '@hooks/use-swipe';
import { setNotificationAction } from '@store/app-notifications/actions';
import {
  clearMeetingsAction,
  getMeetingDaysAction,
  getMeetingsAction,
} from '@store/meetings/actions';
import {
  getMeetingDaysPendingSelector,
  getMeetingsDaysSelector,
  getMeetingsPendingSelector,
} from '@store/meetings/selectors';
import { getMaxTimeOfDay, getMinTimeOfDay } from '@utils/date-utils';
import { DAY_MONTH_YAER, FULL_DATE } from 'common/constants';
import dayjs, { Dayjs } from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { JOIN_DATE_PATH, JOIN_LEVELS_PATH, JOIN_MEETINGS_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

import styles from './JoinMeetingDate.module.scss';

const JoinMeetingDate: React.FC = () => {
  const location = useLocation();
  const meetingData: JoinMeetingType = location?.state;
  const [meetingFrom, setMeetingFrom] = useState<Dayjs | null>(meetingData?.date?.from || null);
  const meetingsDays = useSelector(getMeetingsDaysSelector);
  const pendingLoadDays = useSelector(getMeetingDaysPendingSelector);
  const pendingLoadMeetings = useSelector(getMeetingsPendingSelector);
  const getMeetings = useActionWithDeferred(getMeetingsAction);
  const getMeetingsDays = useActionWithDeferred(getMeetingDaysAction);
  const clearMeetings = useActionWithDispatch(clearMeetingsAction);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);

  const { setBackButtonOnClick } = useTgBackButton(true);

  const locationData = useMemo(() => {
    if (meetingFrom) {
      return {
        ...meetingData,
        date: {
          from: meetingFrom,
          data: {
            path: JOIN_DATE_PATH,
            title: t('meetingInfo.date'),
            value: dayjs(meetingFrom).format(DAY_MONTH_YAER),
          },
        },
      };
    }

    return meetingData;
  }, [meetingFrom, meetingData, t]);

  const handleChangeDate = useCallback(
    (value: Dayjs | null) => {
      let resultDate: Dayjs;
      if (value) {
        if (value.isToday()) {
          resultDate = value;
        } else {
          resultDate = getMinTimeOfDay(value);
        }

        setMeetingFrom(resultDate);
      }
    },
    [setMeetingFrom],
  );

  const handleSubmit = useCallback(() => {
    if (
      meetingData?.language?.currentLanguage &&
      meetingData?.level?.languageLevel &&
      meetingFrom
    ) {
      if (meetingFrom === meetingData?.date?.from) {
        navigate(JOIN_MEETINGS_PATH, {
          state: { ...locationData },
        });

        return;
      }

      clearMeetings();

      getMeetings({
        languageId: meetingData.language.currentLanguage.id,
        languageLevel: meetingData.level.languageLevel,
        from: meetingFrom,
        to: getMaxTimeOfDay(meetingFrom),
      })
        .then(() => {
          navigate(JOIN_MEETINGS_PATH, {
            state: { ...locationData },
          });
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
    meetingData,
    meetingFrom,
    locationData,
    setNotification,
    clearMeetings,
    getMeetings,
    navigate,
    t,
  ]);

  const loadDays = useCallback(
    (date: Dayjs) => {
      if (meetingData?.language?.currentLanguage && meetingData?.level?.languageLevel && date) {
        getMeetingsDays({
          languageId: meetingData.language.currentLanguage.id,
          languageLevel: meetingData.level.languageLevel,
          from: dayjs(date).format(FULL_DATE),
        }).catch(() =>
          setNotification({
            id: dayjs().unix(),
            type: TooltipType.ERROR,
            text: t('errors.loadDyays'),
          }),
        );
      }
    },
    [
      meetingData?.language?.currentLanguage,
      meetingData?.level?.languageLevel,
      getMeetingsDays,
      setNotification,
      t,
    ],
  );

  const handleBack = useCallback(() => {
    navigate(JOIN_LEVELS_PATH, { state: { ...locationData } });
  }, [locationData, navigate]);

  useBackSwipe(handleBack);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <StepBox meetingData={locationData} containerClass={styles.stepBoxContainer} />
      <DatePicker
        onChangeMonth={loadDays}
        defaultDate={meetingFrom}
        availableDays={meetingsDays}
        onChangeDate={handleChangeDate}
        defaultMonth={dayjs(meetingsDays[0])}
      />
      <SubmitButton
        title={t(meetingFrom && !!meetingsDays.length ? 'button.continue' : 'date.choose')}
        onClick={handleSubmit}
        isActive={!!meetingFrom && !!meetingsDays.length}
        loading={pendingLoadDays || pendingLoadMeetings}
      />
    </div>
  );
};

export default JoinMeetingDate;
