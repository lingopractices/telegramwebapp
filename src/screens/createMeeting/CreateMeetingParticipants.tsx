import React, { useCallback, useEffect, useState } from 'react';

import ParticipantsCount from '@components/ParticipantsCount/ParticipantsCount';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_DATE_PATH, CREATE_TOPICS_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingParticipants: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(true, false);

  const handleChangeParticipiants = useCallback(
    (peopleNumber: number) => {
      setMeetingData((prev) => ({ ...prev, peopleNumber }));
    },
    [setMeetingData],
  );

  useEffect(() => {
    if (meetingData?.peopleNumber) {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    } else {
      setMainButtonParams({ text: 'CHOOSE A LANGUAGE', is_active: false });
    }
  }, [meetingData?.peopleNumber, setMainButtonParams]);

  const handleBack = useCallback(() => {
    navigate(CREATE_TOPICS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_DATE_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <ParticipantsCount
      onChangeParticipiants={handleChangeParticipiants}
      defaultParticipiants={meetingData?.peopleNumber}
    />
  );
};

export default CreateMeetingParticipants;
