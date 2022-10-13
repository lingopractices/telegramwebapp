import React, { useState, useCallback, useEffect, useMemo } from 'react';

import QuestionItem from '@components/QuestionItem/QuestionItem';
import SearchBox from '@components/SearchBox/SearchBox';

import TopicItem from './TopicItem/TopicItem';

import styles from './TopicList.module.scss';

interface ITopicList {
  onChangeTopic: (topicId: number) => void;
  dafaultTopicId?: number;
}

export const TopicList: React.FC<ITopicList> = ({ dafaultTopicId, onChangeTopic }) => {
  const topis = useMemo(
    () => [
      {
        name: 'Art',
        id: 1,
        questions: [
          'first',
          'second',
          'third',
          'fourth',
          'fivth',
          'sixth',
          'seventh',
          'eighth',
          'ninth',
          'tenth',
        ],
      },
      {
        name: 'Cinema',
        id: 2,
        questions: [
          'first',
          'second',
          'third',
          'fourth',
          'fivth',
          'sixth',
          'seventh',
          'eighth',
          'ninth',
          'tenth',
        ],
      },
      {
        name: 'Sport',
        id: 3,
        questions: [
          'first',
          'second',
          'third',
          'fourth',
          'fivth',
          'sixth',
          'seventh',
          'eighth',
          'ninth',
          'tenth',
        ],
      },
      {
        name: 'Family',
        id: 4,
        questions: [
          'first',
          'second',
          'third',
          'fourth',
          'fivth',
          'sixth',
          'seventh',
          'eighth',
          'ninth',
          'tenth',
        ],
      },
      {
        name: 'Pets',
        id: 5,
        questions: [
          'first',
          'second',
          'third',
          'fourth',
          'fivth',
          'sixth',
          'seventh',
          'eighth',
          'ninth',
          'tenth',
        ],
      },
      {
        name: 'Test1',
        id: 6,
        questions: [
          'first',
          'second',
          'third',
          'fourth',
          'fivth',
          'sixth',
          'seventh',
          'eighth',
          'ninth',
          'tenth',
        ],
      },
      {
        name: 'Test2',
        id: 7,
        questions: [
          'first',
          'second',
          'third',
          'fourth',
          'fivth',
          'sixth',
          'seventh',
          'eighth',
          'ninth',
          'tenth',
        ],
      },
      {
        name: 'Test3',
        id: 8,
        questions: [
          'first',
          'second',
          'third',
          'fourth',
          'fivth',
          'sixth',
          'seventh',
          'eighth',
          'ninth',
          'tenth',
        ],
      },
      {
        name: 'Test4',
        id: 9,
        questions: [
          'first',
          'second',
          'third',
          'fourth',
          'fivth',
          'sixth',
          'seventh',
          'eighth',
          'ninth',
          'tenth',
        ],
      },
      {
        name: 'Test5',
        id: 10,
        questions: [
          'first',
          'second',
          'third',
          'fourth',
          'fivth',
          'sixth',
          'seventh',
          'eighth',
          'ninth',
          'tenth',
        ],
      },
      {
        name: 'Test6',
        id: 11,
        questions: [
          'first',
          'second',
          'third',
          'fourth',
          'fivth',
          'sixth',
          'seventh',
          'eighth',
          'ninth',
          'tenth',
        ],
      },
      {
        name: 'Test7',
        id: 12,
        questions: [
          'first',
          'second',
          'third',
          'fourth',
          'fivth',
          'sixth',
          'seventh',
          'eighth',
          'ninth',
          'tenth',
        ],
      },
    ],
    [],
  );
  const [filteredTopics, setFilteredTopics] = useState(topis);
  const [currentTopicId, setCurrentTopicId] = useState(dafaultTopicId || -1);
  const [searchStringText, setSearchStringText] = useState('');

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
      topis.filter((item) => item.name.trim().toLowerCase().includes(searchStringText)),
    );
  }, [searchStringText, topis, setFilteredTopics]);

  return (
    <div className={styles.container}>
      <h2>{'choose meeting topic'.toUpperCase()}</h2>
      <SearchBox
        value={searchStringText}
        onChange={handleChangeSearchString}
        containerClassname={styles.search}
      />
      <div className={styles.wrapperList}>
        {filteredTopics.map((topic) => (
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
        ))}
      </div>
    </div>
  );
};

export default TopicList;
