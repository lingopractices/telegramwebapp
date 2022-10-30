import React, { useCallback, useEffect, useState } from 'react';

import TopicList from '@components/TopicList/TopicList';
import { getTopicsPendingSelector } from '@store/topics/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_LEVELS_PATH, CREATE_PARTICIPANTS_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingTopic: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pendingTopicsSelector = useSelector(getTopicsPendingSelector);
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams, setLoadingMainButton } = useTgMainButton(
    true,
    false,
  );

  const handleChangeLevel = useCallback(
    (topicId: number) => {
      if (topicId) {
        setMeetingData((prev) => ({ ...prev, topicId }));
      }
    },
    [setMeetingData],
  );

  useEffect(() => {
    if (meetingData?.topicId) {
      handleChangeLevel(meetingData.topicId);
    }
  }, [meetingData?.topicId, handleChangeLevel]);

  useEffect(() => {
    if (meetingData?.topicId) {
      if (meetingData.topicId > -1) {
        setMainButtonParams({ text: 'SUBMIT', is_active: true });
      } else {
        setMainButtonParams({ text: 'CHOOSE A TOPIC', is_active: false });
      }
    }
  }, [meetingData?.topicId, setMainButtonParams]);

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

  useEffect(() => {
    setLoadingMainButton(pendingTopicsSelector);
  }, [pendingTopicsSelector, setLoadingMainButton]);

  return <TopicList onChangeTopic={handleChangeLevel} defaultTopicId={meetingData?.topicId} />;
};

export default CreateMeetingTopic;
