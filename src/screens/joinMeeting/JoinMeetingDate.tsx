import React, { useCallback, useEffect, useState } from 'react';

import DatePicker from '@components/DatePicker/DatePicker';
import StepBox from '@components/StepBox/StepBox';
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
import { JOIN_DATE_PATH, JOIN_LEVELS_PATH, JOIN_MEETINGS_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

const JoinMeetingDate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [meetingData, setMeetingData] = useState<JoinMeetingType>(location?.state?.meetingData);
  const [meetingFrom, setMeetingFrom] = useState<Dayjs | null>(null);
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

        setMeetingFrom(resultDate);

        if (meetingData?.date?.from) {
          if (resultDate.format(DAY_MONTH_YAER) !== meetingData.date.from.format(DAY_MONTH_YAER)) {
            clearMeetings();
          }
        }

        if (meetingData?.language?.languageId && meetingData?.level.languageLevel && resultDate) {
          getMeetings({
            languageId: meetingData.language.languageId,
            languageLevel: meetingData.level.languageLevel,
            from: resultDate,
            to: getMaxTimeOfDay(resultDate),
          })
            .then(() => {
              navigate(JOIN_MEETINGS_PATH, {
                state: {
                  meetingData: {
                    ...meetingData,
                    date: {
                      from: resultDate,
                      data: {
                        path: JOIN_DATE_PATH,
                        title: t('meetingInfo.date'),
                        value: dayjs(resultDate).format(DAY_MONTH_YAER),
                      },
                    },
                  },
                },
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
      }
    },
    [meetingData, navigate, getMeetings, setNotification, clearMeetings, t],
  );

  useEffect(() => {
    if (meetingFrom) {
      setMeetingData((prev) => ({
        ...prev,
        date: {
          from: meetingFrom,
          data: {
            path: JOIN_DATE_PATH,
            title: t('meetingInfo.date'),
            value: dayjs(meetingFrom).format(DAY_MONTH_YAER),
          },
        },
      }));
    }
  }, [meetingFrom, setMeetingData, t]);

  const handleBack = useCallback(() => {
    navigate(JOIN_LEVELS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const loadDays = useCallback(
    (date: Dayjs) => {
      if (meetingData?.language?.languageId && meetingData?.level.languageLevel && date) {
        getMeetingsDays({
          languageId: meetingData.language.languageId,
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
      meetingData?.language?.languageId,
      meetingData?.level?.languageLevel,
      getMeetingsDays,
      setNotification,
      t,
    ],
  );

  useEffect(() => loadDays(dayjs()), [loadDays]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <StepBox meetingData={meetingData} />
      <DatePicker
        onChangeMonth={loadDays}
        defaultDate={meetingFrom}
        availableDays={meetingsDays}
        onChangeDate={handleChangeDate}
      />
    </>
  );
};

export default JoinMeetingDate;
