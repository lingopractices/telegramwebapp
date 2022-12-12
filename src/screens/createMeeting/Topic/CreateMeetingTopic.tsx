import React, { useCallback, useEffect, useRef, useState } from 'react';

import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import TopicList from '@components/TopicList/TopicList';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
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
  const navigate = useNavigate();
  const topics = useSelector(getTopicsSelector);
  const topicsPending = useSelector(getTopicsPendingSelector);
  const getTopics = useActionWithDeferred(getTopicsAction);
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { t } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChangeTopic = useCallback(
    (topicId: number) => {
      if (typeof topicId === 'number') {
        setMeetingData((prev) => ({
          ...prev,
          topic: {
            topicId,
            data: {
              path: CREATE_TOPICS_PATH,
              title: t('meetingInfo.topic'),
              value: getTopicById(topics, topicId)?.name,
            },
          },
        }));
      }
    },
    [topics, setMeetingData, t],
  );

  const loadMoreTopics = useCallback(() => {
    getTopics().catch(() => {
      setNotification({ id: dayjs().unix(), type: TooltipType.ERROR, text: t('errors.getTopics') });
    });
  }, [getTopics, setNotification, t]);

  const handleBack = useCallback(() => {
    navigate(CREATE_LEVELS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_PARTICIPANTS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

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
      <StepBox meetingData={meetingData} containerClass={styles.stepBoxContainer} />
      <TopicList
        ref={containerRef}
        onChangeTopic={handleChangeTopic}
        loadMoreTopics={loadMoreTopics}
        defaultTopicId={meetingData?.topic?.topicId}
      />
      <SubmitButton
        onClick={handleForward}
        title={meetingData?.topic?.topicId ? t('button.submit') : t('topic.choose')}
        isActive={!!meetingData?.topic?.topicId || !topicsPending}
      />
    </div>
  );
};

export default CreateMeetingTopic;
