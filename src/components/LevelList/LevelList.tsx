import React, { useCallback, useEffect, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ACCOUNT_LEVELS_PATH,
  ACCOUNT_PATH,
  CREATE_LANGUAGES_PATH,
  CREATE_LEVELS_PATH,
  CREATE_TOPICS_PATH,
  JOIN_LANGUAGES_PATH,
  JOIN_LEVELS_PATH,
  JOIN_MEETINGS_PATH,
  MAIN_PATH,
} from 'routing/routing.constants';

import styles from './LevelList.module.scss';

const LevelList = () => {
  const levels = ['Beginer', 'Pre-intemediate', 'Intermediate'];
  const [currentLevel, setCurrentLevel] = useState(levels[1]);
  const [forwardPath, setForwardPath] = useState('');
  const [previousPath, setPreviousPath] = useState('');

  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(
    true,
    false,
    'CHOOSE A LEVEL',
  );
  const location = useLocation();

  const handleBack = useCallback(() => {
    navigate(previousPath);
  }, [previousPath, navigate]);

  const handleForward = useCallback(() => {
    navigate(forwardPath);
  }, [forwardPath, navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  useEffect(() => {
    switch (location.pathname) {
      case CREATE_LEVELS_PATH:
        setForwardPath(CREATE_TOPICS_PATH);
        setPreviousPath(CREATE_LANGUAGES_PATH);
        break;
      case JOIN_LEVELS_PATH:
        setForwardPath(JOIN_MEETINGS_PATH);
        setPreviousPath(JOIN_LANGUAGES_PATH);
        break;
      case ACCOUNT_LEVELS_PATH:
        setForwardPath(ACCOUNT_PATH);
        setPreviousPath(ACCOUNT_PATH);
        break;
      default:
        setForwardPath(MAIN_PATH);
        setPreviousPath(ACCOUNT_PATH);
        break;
    }
  }, [location.pathname, setForwardPath]);

  useEffect(() => {
    if (currentLevel) {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    } else {
      setMainButtonParams({ is_active: false });
    }
  }, [currentLevel, setMainButtonParams]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentLevel(event.target.value);
    },
    [setCurrentLevel],
  );
  return (
    <div className={styles.container}>
      <h2>{'choose meeting language level'.toUpperCase()}</h2>
      <div className={styles.wrapper}>
        {levels.map((level) => (
          <RadioItem
            key={level}
            radioGroupName='languages'
            label={level}
            onChange={handleChange}
            isSelected={level === currentLevel}
            containerClass={styles.paddingContainer}
          />
        ))}
      </div>
    </div>
  );
};

export default LevelList;
