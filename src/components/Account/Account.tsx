import React, { useCallback, useEffect, useState } from 'react';

import InfoItem from '@components/InfoItem/InfoItem';
import useTgBackButton from 'hooks/useTgBackButton';
import { useNavigate } from 'react-router-dom';
import {
  ACCOUNT_INTERFACE_LANGUAGES_PATH,
  ACCOUNT_LANGUAGES_PATH,
  ACCOUNT_LEVELS_PATH,
  BACK_PATH,
} from 'routing/routing.constants';

import styles from './Account.module.scss';

const Account = () => {
  const [language, setLanguage] = useState('English');
  const [level, setLevel] = useState('bginner');
  const [interfaceLanguage, setInterfaceLanguage] = useState('English');

  const navigate = useNavigate();

  const { setBackButtonOnClick } = useTgBackButton(true);

  const handleBack = useCallback(() => {
    navigate(BACK_PATH);
  }, [navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  const openPracticeLanguages = useCallback(() => {
    navigate(ACCOUNT_LANGUAGES_PATH);
  }, [navigate]);

  const openInterfaceLanguages = useCallback(() => {
    navigate(ACCOUNT_INTERFACE_LANGUAGES_PATH);
  }, [navigate]);

  const openLevels = useCallback(() => {
    navigate(ACCOUNT_LEVELS_PATH);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h2>{'my account'.toUpperCase()}</h2>
      <div className={styles.warpper}>
        <InfoItem title='PRACTICE LANGUAGE' value={language} onClick={openPracticeLanguages} />
        <InfoItem title='LEVEL' value={level} onClick={openLevels} />
        <InfoItem title='LOCATION' value='Belarus' onClick={() => {}} />
        <InfoItem title='INTERFACE LANGUAGE' value={language} onClick={openInterfaceLanguages} />
        <InfoItem title='GENDER' value='Male' onClick={() => {}} />
      </div>
    </div>
  );
};

export default Account;
