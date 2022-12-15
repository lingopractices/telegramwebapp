import React, { useState, useCallback, useEffect, useMemo, RefObject } from 'react';

import InfiniteScroll from '@components/InfinteScroll/InfiniteScroll';
import QuestionItem from '@components/QuestionItem/QuestionItem';
import SearchBox from '@components/SearchBox/SearchBox';
import AnimatedLogo, { LogoSize } from '@components/animatedLogo/AnimatedLogo';
import { Skeleton } from '@mui/material';
import {
  getTopicsHasMoreSelector,
  getTopicsPendingSelector,
  getTopicsSelector,
} from '@store/topics/selectors';
import { createAndFillArray } from '@utils/create-fill-array';
import { getClearString } from '@utils/get-clear-string';
import { TOPIC_LIMITS } from '@utils/pagination-limits';
import { ITopic } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import TopicItem from './TopicItem/TopicItem';

import styles from './TopicList.module.scss';

interface ITopicListProps {
  defaultTopicId?: number;
  loadMoreTopics: () => void;
  onChangeTopic: (topicId: number) => void;
}

export const TopicList = React.forwardRef<HTMLDivElement, ITopicListProps>(
  ({ defaultTopicId, onChangeTopic, loadMoreTopics }, ref) => {
    const topics = useSelector(getTopicsSelector);
    const hasMore = useSelector(getTopicsHasMoreSelector);
    const [filteredTopics, setFilteredTopics] = useState(topics);
    const [currentTopicId, setCurrentTopicId] = useState(defaultTopicId || 0);
    const [searchStringText, setSearchStringText] = useState('');
    const pendingGetTopics = useSelector(getTopicsPendingSelector);
    const { t } = useTranslation();

    useEffect(() => {
      onChangeTopic(currentTopicId);
    }, [currentTopicId, onChangeTopic]);

    const handleChangeTopic = useCallback(
      (topicId: number) => {
        if (topicId !== currentTopicId) {
          setCurrentTopicId(topicId);
        } else {
          setCurrentTopicId(0);
        }
      },
      [setCurrentTopicId, currentTopicId],
    );

    const handleChangeSearchString = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchStringText(e.target.value);
      },
      [setSearchStringText],
    );

    useEffect(() => {
      setFilteredTopics(
        topics.filter((topic) =>
          getClearString(topic.name).includes(getClearString(searchStringText)),
        ),
      );
    }, [searchStringText, topics, setFilteredTopics]);

    const renderTopics = useCallback(
      (topic: ITopic) => (
        <div key={topic.id} className={styles.topicWrap}>
          <TopicItem
            id={topic.id}
            name={topic.name}
            isSelected={topic.id === currentTopicId}
            onChange={handleChangeTopic}
          />
          {currentTopicId === topic.id && (
            <ul className={styles.questions}>
              {topic.questions.map((question) => (
                <QuestionItem key={question} label={question} />
              ))}
            </ul>
          )}
        </div>
      ),
      [currentTopicId, handleChangeTopic],
    );

    const renderedTopics = useMemo(
      () => filteredTopics.map(renderTopics),
      [filteredTopics, renderTopics],
    );

    const renderTopicSkelet = useCallback(
      (value: number) => (
        <Skeleton key={value} className={styles.skeletContainer} animation='wave'>
          <TopicItem id={0} name='' isSelected={false} onChange={handleChangeTopic} />
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
