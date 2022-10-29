import React, { useCallback, useEffect, useState } from 'react';

import DatePicker from '@components/DatePicker/DatePicker';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import {
  clearMeetingsAction,
  getMeetingDaysAction,
  getMeetingsAction,
} from '@store/meetings/actions';
import { getMeetingPendingSelector, getMeetingsDaysSelector } from '@store/meetings/selectors';
import { getMaxTimeOfDay } from '@utils/dateUtils';
import { DAY_MONTH_YAER, FULL_DATE } from 'common/constants';
import dayjs, { Dayjs } from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { JOIN_LEVELS_PATH, JOIN_MEETINGS_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

const JoinMeetingDate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [meetingData, setMeetingData] = useState<JoinMeetingType>(location?.state?.meetingData);
  const meetingsDays = useSelector(getMeetingsDaysSelector);
  const pendingGetMeetings = useSelector(getMeetingPendingSelector);
  const getMeetings = useActionWithDeferred(getMeetingsAction);
  const getMeetingsDays = useActionWithDispatch(getMeetingDaysAction);
  const clearMeetings = useActionWithDispatch(clearMeetingsAction);

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams, setLoadingMainButton } = useTgMainButton(
    true,
    false,
  );

  const handleChangeDate = useCallback(
    (meetingAt: Dayjs) => {
      setMeetingData((prev) => ({ ...prev, from: meetingAt }));

      if (meetingData.from) {
        if (meetingAt.format(DAY_MONTH_YAER) !== meetingData.from.format(DAY_MONTH_YAER)) {
          clearMeetings();
        }
      }
    },
    [meetingData.from, setMeetingData, clearMeetings],
  );

  useEffect(() => {
    if (meetingData.from) {
      handleChangeDate(meetingData.from);
    }
  }, [meetingData.from, handleChangeDate]);

  useEffect(() => {
    if (meetingData?.from) {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    } else {
      setMainButtonParams({ text: 'CHOOSE A DATE', is_active: false });
    }
  }, [meetingData?.from, setMainButtonParams]);

  const handleBack = useCallback(() => {
    navigate(JOIN_LEVELS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(JOIN_MEETINGS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleSubmit = useCallback(() => {
    if (meetingData.languageId && meetingData.from && meetingData.languageLevel) {
      getMeetings({
        languageId: meetingData.languageId,
        languageLevel: meetingData.languageLevel,
        from: meetingData.from,
        to: getMaxTimeOfDay(meetingData.from),
      })
        .then(() => {
          handleForward();
        })
        .catch((e) => {});
    }
  }, [meetingData, handleForward, getMeetings]);

  const loadDays = useCallback(
    (date: Dayjs) => {
      if (meetingData.languageId && meetingData.languageLevel) {
        getMeetingsDays({
          languageId: meetingData.languageId,
          languageLevel: meetingData.languageLevel,
          from: JSON.parse(JSON.stringify(date.format(FULL_DATE))),
          userId: 20,
        });
      }
    },
    [getMeetingsDays, meetingData.languageId, meetingData.languageLevel],
  );

  useEffect(() => loadDays(dayjs()), [loadDays]);

  useEffect(() => {
    setMainButtonOnClick(handleSubmit);
  }, [handleSubmit, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  useEffect(() => {
    setLoadingMainButton(pendingGetMeetings);
  }, [pendingGetMeetings, setLoadingMainButton]);

  return (
    <DatePicker
      loadDays={loadDays}
      defaultMeetingDate={meetingData?.from || dayjs()}
      freeDays={meetingsDays}
      onChangeDate={handleChangeDate}
    />
  );
};

export default JoinMeetingDate;
