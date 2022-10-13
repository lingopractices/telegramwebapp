import React, { useCallback, useEffect, useState } from 'react';

import InfoItem from '@components/InfoItem/InfoItem';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useNavigate } from 'react-router-dom';
import {
  CREATE_DATE_PATH,
  CREATE_LANGUAGES_PATH,
  CREATE_LEVELS_PATH,
  CREATE_PARTICIPANTS_PATH,
  CREATE_TIME_PATH,
  CREATE_TOPICS_PATH,
  MAIN_PATH,
} from 'routing/routing.constants';

import styles from './ResultInfo.module.scss';

const ResultInfo = () => {
  const [language, setLanguage] = useState('English');
  const [level, setLevel] = useState('bginner');
  const [topic, setTopic] = useState('Art');
  const [participiants, setParticipiants] = useState('3');
  const [date, setDate] = useState('28.09.2002');
  const [time, setTime] = useState('15:44');

  const navigate = useNavigate();

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick } = useTgMainButton(true, true, 'SUBMIT');

  const handleBack = useCallback(() => {
    navigate(CREATE_TIME_PATH);
  }, [navigate]);

  const handleForward = useCallback(() => {
    navigate(MAIN_PATH);
  }, [navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  const openLanguages = useCallback(() => {
    navigate(CREATE_LANGUAGES_PATH);
  }, [navigate]);

  const openLevels = useCallback(() => {
    navigate(CREATE_LEVELS_PATH);
  }, [navigate]);

  const openTopics = useCallback(() => {
    navigate(CREATE_TOPICS_PATH);
  }, [navigate]);

  const openPraticipiants = useCallback(() => {
    navigate(CREATE_PARTICIPANTS_PATH);
  }, [navigate]);

  const openDate = useCallback(() => {
    navigate(CREATE_DATE_PATH);
  }, [navigate]);

  const openTime = useCallback(() => {
    navigate(CREATE_TIME_PATH);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h2>CREATE MEETING</h2>
      <div className={styles.wrapper}>
        <InfoItem title='PRACTICE LANGUAGE' value={language} onClick={openLanguages} />
        <InfoItem title='LEVEL' value={level} onClick={openLevels} />
        <InfoItem title='TOPIC' value={topic} onClick={openTopics} />
        <InfoItem title='PARTICIPIANTS NUMBER' value={participiants} onClick={openPraticipiants} />
        <InfoItem title='DATE' value={date} onClick={openDate} />
        <InfoItem title='TIME' value={time} onClick={openTime} />
      </div>
    </div>
  );
};

export default ResultInfo;
