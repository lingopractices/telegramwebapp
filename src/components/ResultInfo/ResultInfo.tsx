import React, { useState } from 'react';

import InfoItem from '@components/InfoItem/InfoItem';

import styles from './ResultInfo.module.scss';

const ResultInfo = () => {
  const [language, setLanguage] = useState('English');
  const [level, setLevel] = useState('bginner');
  const [topic, setTopic] = useState('Art');
  const [participiants, setParticipiants] = useState('3');
  const [date, setDate] = useState('28.09.2002');
  const [time, setTime] = useState('15:44');

  return (
    <div className={styles.container}>
      <h2>CREATE MEETING</h2>
      <div className={styles.wrapper}>
        <InfoItem title='PRACTICE LANGUAGE' value={language} onClick={() => {}} />
        <InfoItem title='LEVEL' value={level} onClick={() => {}} />
        <InfoItem title='TOPIC' value={topic} onClick={() => {}} />
        <InfoItem title='PARTICIPIANTS NUMBER' value={participiants} onClick={() => {}} />
        <InfoItem title='DATE' value={date} onClick={() => {}} />
        <InfoItem title='TIME' value={time} onClick={() => {}} />
      </div>
    </div>
  );
};

export default ResultInfo;
