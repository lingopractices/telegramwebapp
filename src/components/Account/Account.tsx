import React, { useState } from 'react';

import InfoItem from '@components/InfoItem/InfoItem';
import { useNavigate } from 'react-router-dom';
import {
  ACCOUNT_INTERFACE_LANGUAGES_PATH,
  ACCOUNT_LANGUAGES_PATH,
  ACCOUNT_LEVELS_PATH,
} from 'routing/routing.constants';

import styles from './Account.module.scss';

const Account = () => {
  const [language, setLanguage] = useState('English');
  const [level, setLevel] = useState('bginner');
  const [interfaceLanguage, setInterfaceLanguage] = useState('English');
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2>{'my account'.toUpperCase()}</h2>
      <div className={styles.warpper}>
        <InfoItem
          title='PRACTICE LANGUAGE'
          value={language}
          onClick={() => navigate(ACCOUNT_LANGUAGES_PATH)}
        />
        <InfoItem title='LEVEL' value={level} onClick={() => navigate(ACCOUNT_LEVELS_PATH)} />
        <InfoItem title='LOCATION' value='Belarus' onClick={() => {}} />
        <InfoItem
          title='INTERFACE LANGUAGE'
          value={language}
          onClick={() => navigate(ACCOUNT_INTERFACE_LANGUAGES_PATH)}
        />
        <InfoItem title='GENDER' value='Male' onClick={() => {}} />
      </div>
    </div>
  );
};

export default Account;
