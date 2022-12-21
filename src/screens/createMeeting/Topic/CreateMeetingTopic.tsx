import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import TopicList from '@components/TopicList/TopicList';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { useBackSwipe } from '@hooks/use-swipe';
import { setNotificationAction } from '@store/app-notifications/actions';
import { getTopicsAction } from '@store/topics/actions';
import { getTopicsPendingSelector, getTopicsSelector } from '@store/topics/selectors';
import { getTopicById } from '@utils/get-language-topic-by-id';
import classNames from 'classnames';
import dayjs from 'dayjs';
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
  const [newTopicId, setNewTopicId] = useState(meetingData?.topic?.topicId);
  const getTopics = useActionWithDeferred(getTopicsAction);
  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { t } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);
  const containerRef = useRef<HTMLDivElement>(null);

  const locationData = useMemo(() => {
    if (newTopicId) {
      return {
        ...meetingData,
        topic: {
          topicId: newTopicId,
          data: {
            path: CREATE_TOPICS_PATH,
            title: t('meetingInfo.topic'),
            value: getTopicById(topics, newTopicId)?.name,
          },
        },
      };
    }

    return meetingData;
  }, [topics, meetingData, newTopicId, t]);

  const loadMoreTopics = useCallback(() => {
    getTopics().catch(() => {
      setNotification({ id: dayjs().unix(), type: TooltipType.ERROR, text: t('errors.getTopics') });
    });
  }, [getTopics, setNotification, t]);

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
      <TopicList
        ref={containerRef}
        onChangeTopic={setNewTopicId}
        loadMoreTopics={loadMoreTopics}
        defaultTopicId={newTopicId}
      />
      <SubmitButton
        onClick={handleForward}
        title={newTopicId ? t('button.continue') : t('topic.choose')}
        isActive={!!newTopicId}
      />
    </div>
  );
};

export default CreateMeetingTopic;
