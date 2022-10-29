import React, { useCallback, useEffect, useState } from 'react';

import DatePicker from '@components/DatePicker/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_PARTICIPANTS_PATH, CREATE_TIME_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingDate: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(true, false);

  const handleChangeDate = useCallback(
    (meetingAt: Dayjs) => {
      setMeetingData((prev) => ({ ...prev, meetingAt }));
    },
    [setMeetingData],
  );

  useEffect(() => {
    if (meetingData?.meetingAt) {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    } else {
      setMainButtonParams({ text: 'CHOOSE A DATE', is_active: false });
    }
  }, [meetingData?.meetingAt, setMainButtonParams]);

  const handleBack = useCallback(() => {
    navigate(CREATE_PARTICIPANTS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_TIME_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <button type='button' onClick={handleForward}>
        go
      </button>
      <button type='button' onClick={handleBack}>
        back
      </button>
      <DatePicker
        defaultMeetingDate={meetingData?.meetingAt || dayjs()}
        onChangeDate={handleChangeDate}
      />
    </>
  );
};

export default CreateMeetingDate;
