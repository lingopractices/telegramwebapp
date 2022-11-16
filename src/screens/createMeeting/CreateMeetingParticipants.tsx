import React, { useCallback, useEffect, useState } from 'react';

import ParticipantsCount from '@components/ParticipantsCount/ParticipantsCount';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_DATE_PATH, CREATE_TOPICS_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingParticipants: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const [peopleNumber, setPeopleNumber] = useState(meetingData?.peopleNumber);

  const { setBackButtonOnClick } = useTgBackButton(true);

  useEffect(() => {
    setMeetingData((prev) => ({ ...prev, peopleNumber }));
  }, [peopleNumber, setMeetingData]);

  const handleBack = useCallback(() => {
    navigate(CREATE_TOPICS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_DATE_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <ParticipantsCount
        onChangeParticipiants={setPeopleNumber}
        defaultParticipiants={meetingData?.peopleNumber}
      />
      <SubmitButton
        onClick={handleForward}
        title={meetingData?.peopleNumber ? t('button.submit') : t('participants.choose')}
        isActive={!!meetingData?.peopleNumber}
      />
    </>
  );
};

export default CreateMeetingParticipants;
