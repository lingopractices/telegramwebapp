import React, { useState } from 'react';

import styles from './Meeting.module.scss';

const Meeting = () => {
  const [date, setDate] = useState('12.36.123');
  const [topic, setTopic] = useState('Art');
  const [participantCount, setParticipantCount] = useState(2);
  const [questions, setQuestions] = useState(['asd1', 'asd2', 'asd3']);

  return (
    <div className={styles.container}>
      <h3>meeting information</h3>
      <div className={styles.content}>
        <span>date: {date}</span>
        <span>people: {participantCount}</span>
        <span>topic: {topic}</span>
        <ul>
          {questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </div>
      <button type='button'>leave meeting</button>
    </div>
  );
};

export default Meeting;
