import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import TopicList from '@components/TopicList/TopicList';
import { useBackSwipe } from '@hooks/use-swipe';
import { getTopicsPendingSelector, getTopicsSelector } from '@store/topics/selectors';
import classNames from 'classnames';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CREATE_LEVELS_PATH,
  CREATE_PARTICIPANTS_PATH,
  CREATE_TOPICS_PATH,
} from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

import styles from './CreateMeetingTopic.module.scss';

const CreateMeetingTopic: React.FC = () => {
  const location = useLocation();
  const topics = useSelector(getTopicsSelector);
  const topicsPending = useSelector(getTopicsPendingSelector);
  const meetingData: CreateMeetingType = location?.state;
  const [newTopic, setNewTopic] = useState(meetingData?.topic?.currentTopic);
  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const locationData = useMemo(() => {
    if (newTopic) {
      return {
        ...meetingData,
        topic: {
          currentTopic: newTopic,
          data: {
            path: CREATE_TOPICS_PATH,
            title: t('meetingInfo.topic'),
            value: newTopic.name,
          },
        },
      };
    }

    return meetingData;
  }, [meetingData, newTopic, t]);

  const handleBack = useCallback(() => {
    navigate(CREATE_LEVELS_PATH, { state: { ...locationData } });
  }, [locationData, navigate]);

  useBackSwipe(handleBack);

  const handleForward = useCallback(() => {
    navigate(CREATE_PARTICIPANTS_PATH, { state: { ...locationData } });
  }, [locationData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div
      className={classNames(styles.container, {
        [styles.pending]: topicsPending && !topics.length,
      })}
      ref={containerRef}
    >
      <StepBox meetingData={locationData} containerClass={styles.stepBoxContainer} />
      <TopicList ref={containerRef} onChangeTopic={setNewTopic} defaultTopic={newTopic} />
      <SubmitButton
        onClick={handleForward}
        title={newTopic ? t('button.continue') : t('topic.choose')}
        isActive={!!newTopic}
      />
    </div>
  );
};

export default CreateMeetingTopic;
