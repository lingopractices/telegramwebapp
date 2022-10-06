import React, { useState } from 'react';

import styles from './Account.module.scss';

const Account = () => {
  const [language, setLanguage] = useState('English');
  const [level, setLevel] = useState('bginner');
  const [interfaceLanguage, setInterfaceLanguage] = useState('English');

  return (
    <div className={styles.container}>
      <h2>{'my account'.toUpperCase()}</h2>
      <div className={styles.warpper}>
        <div className={styles.itemBox}>
          <span className={styles.header}>{'practice language'.toUpperCase()}</span>
          <div className={styles.bottomWrapper}>
            <span className={styles.value}>{language}</span>
            <button type='button' className={styles.change}>
              Change
            </button>
          </div>
        </div>
        <div className={styles.itemBox}>
          <span className={styles.header}>{'level'.toUpperCase()}</span>
          <div className={styles.bottomWrapper}>
            <span className={styles.value}>{level}</span>
            <button type='button' className={styles.change}>
              Change
            </button>
          </div>
        </div>
        <div className={styles.itemBox}>
          <span className={styles.header}>{'interface language'.toUpperCase()}</span>
          <div className={styles.bottomWrapper}>
            <span className={styles.value}>{interfaceLanguage}</span>
            <button type='button' className={styles.change}>
              Change
            </button>
          </div>
        </div>
        <div className={styles.itemBox}>
          <span className={styles.header}>{'location'.toUpperCase()}</span>
          <div className={styles.bottomWrapper}>
            <span className={styles.value}>Belarus</span>
            <button type='button' className={styles.change}>
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
