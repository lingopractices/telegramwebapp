import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';

import QuestionItem from '@components/QuestionItem/QuestionItem';
import SearchBox from '@components/SearchBox/SearchBox';

import TopicItem from './TopicItem/TopicItem';

import styles from './TopicList.module.scss';

export const TopicList = () => {
  const topis = useMemo(
    () => [
      'Art',
      'Cinema',
      'Sport',
      'Family',
      'Pets',
      'Test1',
      'Test2',
      'Test3',
      'Test4',
      'Test5',
      'Test6',
      'Test7',
      'elventh',
      'twelves',
      'fourteenth',
      'fivteents',
      'sexteenth',
      'seveteenth',
      'eighteenth',
      'ninteeth',
      'twenteenth',
    ],
    [],
  );
  const [filteredTopics, setFilteredTopics] = useState(topis);
  const [currentTopic, setCurrentTopic] = useState('');
  const [searchStringText, setSearchStringText] = useState('');
  const [questions, setQuestions] = useState<string[]>([
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
  ]);
  const questionsRef = useRef<HTMLLIElement>(null);

  const handleChangeTopic = useCallback(
    (label: string) => {
      if (label !== currentTopic) {
        setCurrentTopic(label);
      } else {
        setCurrentTopic('');
      }
    },
    [setCurrentTopic, currentTopic],
  );

  const handleChangeSearchString = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchStringText(e.target.value);
    },
    [setSearchStringText],
  );

  useEffect(() => {
    if (searchStringText)
      setFilteredTopics(
        topis.filter((item) => item.trim().toLocaleLowerCase().includes(searchStringText)),
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
          <div key={topic}>
            <TopicItem
              label={topic}
              isSelected={topic === currentTopic}
              onChange={handleChangeTopic}
            />
            {currentTopic === topic && (
              <ul className={styles.questions}>
                {questions.map((question) => (
                  <QuestionItem label={question} />
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
