import React, { useState } from 'react';

import styles from './Account.module.scss';

const Account = () => {
  const [language, setLanguage] = useState('English');
  const [level, setLevel] = useState('bginner');
  const [interfaceLanguage, setInterfaceLanguage] = useState('English');

  return (
    <div className={styles.container}>
      <h2>Account</h2>
      <div>
        <span>Practice language: {language}</span>
        <button type='button'>change</button>
      </div>
      <div>
        <span>Current level: {level}</span>
        <button type='button'>change</button>
      </div>
      <div>
        <span>Interface language: {interfaceLanguage}</span>
        <button type='button'>change</button>
      </div>
      <div>
        <span>Your gender is: </span>
        <label>
          male
          <input type='radio' name='gender' />
        </label>
        <label>
          female
          <input type='radio' name='gender' />
        </label>
      </div>
    </div>
  );
};

export default Account;
