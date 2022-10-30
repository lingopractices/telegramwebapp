import React, { useCallback, useEffect, useState } from 'react';

import Time from '@components/Time/Time';
import { Dayjs } from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_DATE_PATH, CREATE_INFO } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingTime: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(true, false);

  const handleChangeTime = useCallback(
    (meetingAt: Dayjs) => {
      setMeetingData((prev) => ({ ...prev, meetingAt }));
    },
    [setMeetingData],
  );

  useEffect(() => {
    if (meetingData?.meetingAt) {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    } else {
      setMainButtonParams({ text: 'CHOOSE A TIME', is_active: false });
    }
  }, [meetingData?.meetingAt, setMainButtonParams]);

  const handleBack = useCallback(() => {
    navigate(CREATE_DATE_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_INFO, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return <Time defaultMeetingTime={meetingData?.meetingAt} onChangeTime={handleChangeTime} />;
};

export default CreateMeetingTime;
