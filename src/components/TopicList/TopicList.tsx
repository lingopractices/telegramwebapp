import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';

import InfiniteScroll from '@components/InfinteScroll/InfiniteScroll';
import QuestionItem from '@components/QuestionItem/QuestionItem';
import SearchBox from '@components/SearchBox/SearchBox';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { getTopicsAction } from '@store/topics/actions';
import { getTopicsHasMoreSelector, getTopicsSelector } from '@store/topics/selectors';
import { ITopic } from 'lingopractices-models';
import { useSelector } from 'react-redux';

import TopicItem from './TopicItem/TopicItem';

import styles from './TopicList.module.scss';

interface ITopicList {
  dafaultTopicId?: number;
  onChangeTopic: (topicId: number) => void;
}

export const TopicList: React.FC<ITopicList> = ({ dafaultTopicId, onChangeTopic }) => {
  const topics = useSelector(getTopicsSelector);
  const hasMore = useSelector(getTopicsHasMoreSelector);
  const getTopics = useActionWithDispatch(getTopicsAction);
  const [filteredTopics, setFilteredTopics] = useState(topics);
  const [currentTopicId, setCurrentTopicId] = useState(dafaultTopicId || -1);
  const [searchStringText, setSearchStringText] = useState('');
  const infiniteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onChangeTopic(currentTopicId);
  }, [currentTopicId, onChangeTopic]);

  const handleChangeTopic = useCallback(
    (topicId: number) => {
      if (topicId !== currentTopicId) {
        setCurrentTopicId(topicId);
      } else {
        setCurrentTopicId(-1);
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
      topics.filter((item) => item.name.trim().toLowerCase().includes(searchStringText)),
    );
  }, [searchStringText, topics, setFilteredTopics]);

  const renderTopics = useCallback(
    (topic: ITopic) => (
      <div key={topic.id}>
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

  const loadMore = useCallback(() => {
    getTopics();
  }, [getTopics]);

  return (
    <div className={styles.container}>
      <h2>{'choose meeting topic'.toUpperCase()}</h2>
      <SearchBox
        value={searchStringText}
        onChange={handleChangeSearchString}
        containerClassname={styles.search}
      />
      <div className={styles.wrapperList} ref={infiniteRef}>
        <InfiniteScroll onReachBottom={loadMore} containerRef={infiniteRef} hasMore={hasMore}>
          {renderedTopics}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default TopicList;
