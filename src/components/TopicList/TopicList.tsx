import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import SearchBox from '@components/SearchBox/SearchBox';

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
  const [questions, setQuestions] = useState<string[]>([]);
  const questionsRef = useRef<HTMLLIElement>(null);

  const handleChangeTopic = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTopic(event.target.value);
      setQuestions([]);
    },
    [setCurrentTopic, setQuestions],
  );

  const handleChangeSearchString = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchStringText(e.target.value);
    },
    [setSearchStringText],
  );

  useEffect(() => {
    setFilteredTopics(topis.filter((item) => item.trim().toLocaleLowerCase().includes(searchStringText)));
  }, [searchStringText, topis, setFilteredTopics]);

  useEffect(() => {
    let idTimout: ReturnType<typeof setTimeout>;

    if (currentTopic) {
      setSearchStringText('');

      idTimout = setTimeout(() => {
        setQuestions(['first', 'second', 'third', 'fourth', 'fivth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth']);
      }, Math.floor(Math.random() * (800 - 200 + 1) + 200));
    }
    return () => clearTimeout(idTimout);
  }, [currentTopic, setQuestions, setSearchStringText]);

  useEffect(() => {
    if (questions.length) {
      questionsRef.current?.scrollIntoView(false);
    }
  }, [questions]);

  return (
    <div className={styles.container}>
      <h3>Change topic</h3>
      <SearchBox value={searchStringText} onChange={handleChangeSearchString} />
      {filteredTopics.map((topic) => (
        <div key={topic}>
          <RadioItem radioGroupName='languages' label={topic} onChange={handleChangeTopic} isSelected={topic === currentTopic} />
          {currentTopic === topic && (
            <ul>
              {questions.map((question) => (
                <li ref={questionsRef} key={question}>
                  {question}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopicList;
