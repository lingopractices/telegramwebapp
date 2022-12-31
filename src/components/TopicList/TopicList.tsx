import React, { useState, useCallback, useEffect, useMemo, RefObject, useRef } from 'react';

import InfiniteScroll from '@components/InfinteScroll/InfiniteScroll';
import QuestionItem from '@components/QuestionItem/QuestionItem';
import SearchBox from '@components/SearchBox/SearchBox';
import { TooltipType } from '@components/Tooltip/Tooltip';
import AnimatedLogo, { LogoSize } from '@components/animatedLogo/AnimatedLogo';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { Skeleton } from '@mui/material';
import { setNotificationAction } from '@store/app-notifications/actions';
import { getTopicsAction } from '@store/topics/actions';
import {
  getTopicsHasMoreSelector,
  getTopicsPendingSelector,
  getTopicsSelector,
} from '@store/topics/selectors';
import { createAndFillArray } from '@utils/create-fill-array';
import { getClearString } from '@utils/get-clear-string';
import { TOPIC_LIMITS } from '@utils/pagination-limits';
import dayjs from 'dayjs';
import { ITopic } from 'lingopractices-models';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import TopicItem from './TopicItem/TopicItem';

import styles from './TopicList.module.scss';

interface ITopicListProps {
  defaultTopic?: ITopic;

  onChangeTopic: (topic: ITopic) => void;
}

export const TopicList = React.forwardRef<HTMLDivElement, ITopicListProps>(
  ({ defaultTopic, onChangeTopic }, ref) => {
    const selectedTopicRef = useRef<HTMLLIElement>(null);
    const containerRef = ref as RefObject<HTMLDivElement>;
    const topics = useSelector(getTopicsSelector);
    const hasMore = useSelector(getTopicsHasMoreSelector);
    const [filteredTopics, setFilteredTopics] = useState(topics);
    const [currentTopic, setCurrentTopic] = useState(defaultTopic);
    const pendingGetTopics = useSelector(getTopicsPendingSelector);
    const setNotification = useActionWithDispatch(setNotificationAction);
    const getTopics = useActionWithDeferred(getTopicsAction);
    const { t } = useTranslation();

    useEffect(() => {
      if (containerRef.current && selectedTopicRef.current) {
        containerRef.current.scrollTo(
          0,
          selectedTopicRef.current.offsetTop -
            containerRef.current.offsetHeight / 2 +
            selectedTopicRef.current.offsetHeight / 2,
        );
      }
    }, [containerRef, selectedTopicRef]);

    useEffect(() => {
      if (!isEmpty(topics)) {
        setFilteredTopics(topics);
      }
    }, [topics, setFilteredTopics]);

    const loadMoreTopics = useCallback(() => {
      getTopics().catch(() => {
        setNotification({
          id: dayjs().unix(),
          type: TooltipType.ERROR,
          text: t('errors.getTopics'),
        });
      });
    }, [getTopics, setNotification, t]);

    const handleChangeTopic = useCallback(
      (topic: ITopic) => {
        setCurrentTopic(topic.id !== currentTopic?.id ? topic : undefined);
        onChangeTopic(topic);
      },
      [setCurrentTopic, onChangeTopic, currentTopic],
    );

    const handleChangeSearchString = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilteredTopics(
          topics.filter((topic) =>
            getClearString(topic.name).includes(getClearString(e.target.value)),
          ),
        );
      },
      [topics],
    );

    const renderTopics = useCallback(
      (topic: ITopic) => (
        <div key={topic.id} className={styles.topicWrap}>
          <TopicItem
            ref={currentTopic?.id === topic.id ? selectedTopicRef : null}
            topic={topic}
            isSelected={topic.id === currentTopic?.id}
            onChange={handleChangeTopic}
          />
          {currentTopic?.id === topic.id && (
            <ul className={styles.questions}>
              {topic.questions.map((question) => (
                <QuestionItem key={question} label={question} />
              ))}
            </ul>
          )}
        </div>
      ),
      [currentTopic, handleChangeTopic],
    );

    const renderedTopics = useMemo(
      () => filteredTopics.map(renderTopics),
      [filteredTopics, renderTopics],
    );

    const renderTopicSkelet = useCallback(
      (value: number) => (
        <Skeleton key={value} className={styles.skeletContainer} animation='wave'>
          <TopicItem
            topic={{ id: 0, name: '', questions: [] }}
            isSelected={false}
            onChange={handleChangeTopic}
          />
        </Skeleton>
      ),
      [handleChangeTopic],
    );

    const renderedTopicsSkelet = useMemo(
      () => createAndFillArray(TOPIC_LIMITS).map(renderTopicSkelet),
      [renderTopicSkelet],
    );

    return (
      <div className={styles.container}>
        <div className={styles.stickyHeader}>
          <h2>{t('topic.chooseTopic')}</h2>
          <SearchBox onChange={handleChangeSearchString} containerClassname={styles.search} />
        </div>

        {pendingGetTopics && !topics.length ? (
          renderedTopicsSkelet
        ) : (
          <div>
            <InfiniteScroll
              onReachBottom={loadMoreTopics}
              containerRef={ref as RefObject<HTMLDivElement>}
              hasMore={hasMore}
            >
              {renderedTopics}
              {pendingGetTopics && topics.length ? (
                <AnimatedLogo containerClass={styles.animatedLogo} size={LogoSize.SMALL} />
              ) : null}
            </InfiniteScroll>
          </div>
        )}
      </div>
    );
  },
);

export default TopicList;
