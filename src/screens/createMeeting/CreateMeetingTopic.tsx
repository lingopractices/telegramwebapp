import React, { useCallback, useEffect, useState } from 'react';

import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import TopicList from '@components/TopicList/TopicList';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { setNotificationAction } from '@store/notifications/actions';
import { getTopicsAction } from '@store/topics/actions';
import dayjs from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
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
  const { t } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);

  const handleChangeTopic = useCallback(
    (topicId: number) => {
      if (typeof topicId === 'number') {
        setMeetingData((prev) => ({ ...prev, topicId }));
      }
    },
    [setMeetingData],
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
    <>
      <TopicList
        onChangeTopic={handleChangeTopic}
        loadMoreTopics={loadMoreTopics}
        defaultTopicId={meetingData?.topicId}
      />
      <SubmitButton
        onClick={handleForward}
        title={meetingData?.topicId ? t('button.submit') : t('topic.choose')}
        isActive={!!meetingData?.topicId}
      />
    </>
  );
};

export default CreateMeetingTopic;
