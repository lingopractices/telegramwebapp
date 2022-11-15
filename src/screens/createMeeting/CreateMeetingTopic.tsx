import React, { useCallback, useEffect, useState } from 'react';

import StaticNavigation from '@components/StaticNavigation/StaticNavigation';
import TopicList from '@components/TopicList/TopicList';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { getTopicsAction } from '@store/topics/actions';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_LEVELS_PATH, CREATE_PARTICIPANTS_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingTopic: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getTopics = useActionWithDeferred(getTopicsAction);
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams, setLoadingMainButton, devButton } =
    useTgMainButton(true, false);
  const { t } = useTranslation();

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
        setMainButtonParams({ text: t('button.submit').toUpperCase(), is_active: true });
      } else {
        setMainButtonParams({ text: t('topic.choose').toUpperCase(), is_active: false });
      }
    }
  }, [meetingData?.topicId, setMainButtonParams, t]);

  const loadMoreTopics = useCallback(() => {
    setLoadingMainButton(true);
    getTopics()
      .then(() => {
        setLoadingMainButton(false);
      })
      .catch((e) => {
        setLoadingMainButton(false);
      });
  }, [getTopics, setLoadingMainButton]);

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

  return (
    <>
      <TopicList
        onChangeTopic={handleChangeLevel}
        loadMoreTopics={loadMoreTopics}
        defaultTopicId={meetingData?.topicId}
      />
      {import.meta.env.DEV && (
        <StaticNavigation
          handleBack={handleBack}
          handleSubmit={handleForward}
          devButton={devButton}
        />
      )}
    </>
  );
};

export default CreateMeetingTopic;
