import React, { useCallback, useEffect, useState } from 'react';

import TopicList from '@components/TopicList/TopicList';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_LEVELS_PATH, CREATE_PARTICIPANTS_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingTopic: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(
    true,
    false,
    'CHOOSE A TOPIC',
  );

  const handleChangeLanguage = useCallback(
    (topicId: number) => {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
      setMeetingData((prev) => ({ ...prev, topicId }));
    },
    [setMainButtonParams, setMeetingData],
  );

  const handleBack = useCallback(() => {
    navigate(CREATE_LEVELS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_PARTICIPANTS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return <TopicList onChangeTopic={handleChangeLanguage} dafaultTopicId={meetingData?.topicId} />;
};

export default CreateMeetingTopic;
