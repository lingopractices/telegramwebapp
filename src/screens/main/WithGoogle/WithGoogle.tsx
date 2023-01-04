import React from 'react';

import { ReactComponent as GoogleIcon } from '@assets/icons/google.svg';
import { useTranslation } from 'react-i18next';

import styles from './WithGoogle.module.scss';

const WithGoogle = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p className={styles.alert}>{t('google.sign')}</p>
      <button className={styles.googleButton}>
        <GoogleIcon />
        {t('google.withGoogle')}
      </button>
    </div>
  );
};

export default WithGoogle;
