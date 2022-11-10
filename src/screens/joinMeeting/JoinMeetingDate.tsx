import React, { useCallback, useEffect, useState } from 'react';

import DatePicker from '@components/DatePicker/DatePicker';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import {
  clearMeetingsAction,
  getMeetingDaysAction,
  getMeetingsAction,
} from '@store/meetings/actions';
import { getMeetingsDaysSelector } from '@store/meetings/selectors';
import { getMaxTimeOfDay, getMinTimeOfDay } from '@utils/dateUtils';
import { DAY_MONTH_YAER, FULL_DATE } from 'common/constants';
import dayjs, { Dayjs } from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
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
  const getMeetings = useActionWithDeferred(getMeetingsAction);
  const getMeetingsDays = useActionWithDeferred(getMeetingDaysAction);
  const clearMeetings = useActionWithDispatch(clearMeetingsAction);
  const { t } = useTranslation();

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams, setLoadingMainButton } = useTgMainButton(
    true,
    false,
  );

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

  useEffect(() => {
    if (meetingData?.from) {
      setMainButtonParams({ text: t('button.submit').toUpperCase(), is_active: true });
    } else {
      setMainButtonParams({ text: t('date.choose').toUpperCase(), is_active: false });
    }
  }, [meetingData?.from, setMainButtonParams, t]);

  const handleBack = useCallback(() => {
    navigate(JOIN_LEVELS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(JOIN_MEETINGS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleSubmit = useCallback(() => {
    if (meetingData?.languageId && meetingData?.from && meetingData?.languageLevel) {
      setLoadingMainButton(true);
      getMeetings({
        languageId: meetingData.languageId,
        languageLevel: meetingData.languageLevel,
        from: meetingData.from,
        to: getMaxTimeOfDay(meetingData.from),
      })
        .then(() => {
          setLoadingMainButton(false);
          handleForward();
        })
        .catch((e) => {
          setLoadingMainButton(false);
        });
    }
  }, [
    meetingData?.languageLevel,
    meetingData?.languageId,
    meetingData?.from,
    handleForward,
    getMeetings,
    setLoadingMainButton,
  ]);

  const loadDays = useCallback(
    (date: Dayjs) => {
      if (meetingData?.languageId && meetingData?.languageLevel && date) {
        setLoadingMainButton(true);
        getMeetingsDays({
          languageId: meetingData.languageId,
          languageLevel: meetingData.languageLevel,
          from: date.format(FULL_DATE),
        })
          .then(() => {
            setLoadingMainButton(false);
          })
          .catch((e) => {
            setLoadingMainButton(false);
          });
      }
    },
    [meetingData?.languageId, meetingData?.languageLevel, getMeetingsDays, setLoadingMainButton],
  );

  useEffect(() => loadDays(dayjs()), [loadDays]);

  useEffect(() => {
    setMainButtonOnClick(handleSubmit);
  }, [handleSubmit, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <DatePicker
      onChangeMonth={loadDays}
      defaultDate={meetingData?.from}
      availableDays={meetingsDays}
      onChangeDate={handleChangeDate}
    />
  );
};

export default JoinMeetingDate;
