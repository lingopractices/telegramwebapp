import React, { useCallback, useEffect, useState } from 'react';

import Time from '@components/Time/Time';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_DATE_PATH, CREATE_INFO } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingTime: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(
    true,
    false,
    'CHOOSE A TIME',
  );

  const handleChangeTime = useCallback(
    (meetingAt: string) => {
      setMeetingData((prev) => ({ ...prev, meetingAt }));
    },
    [setMainButtonParams, setMeetingData],
  );

  useEffect(() => {
    if (meetingData?.meetingAt) {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    } else {
      setMainButtonParams({ text: 'CHOOSE A TIME', is_active: false });
    }
  }, [meetingData?.meetingAt]);

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
