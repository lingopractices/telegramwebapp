import React, { useCallback, useEffect, useState } from 'react';

import { ReactComponent as GoogleIcon } from '@assets/icons/google.svg';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { useBackSwipe } from '@hooks/use-swipe';
import useTgBackButton from '@hooks/useTgBackButton';
import { Skeleton } from '@mui/material';
import { setNotificationAction } from '@store/app-notifications/actions';
import { getGoogleReauthLink } from '@store/profile/actions';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { INSTANT_MAIN_PATH } from 'routing/routing.constants';

import styles from './WithGoogle.module.scss';

const WithGoogle = () => {
  const [loginUrl, setLoginUrl] = useState('');
  const [fetchingUrl, setFetchingUrl] = useState(true);

  const getlogInUrl = useActionWithDeferred(getGoogleReauthLink);
  const navigate = useNavigate();
  const setNotification = useActionWithDispatch(setNotificationAction);
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { t } = useTranslation();

  const openGoogle = useCallback(() => {
    window.open(loginUrl, '_blank');
  }, [loginUrl]);

  const handleBack = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  useBackSwipe(handleBack);

  useEffect(() => {
    getlogInUrl()
      .then((url?: string) => {
        if (url) {
          setLoginUrl(url);
          setFetchingUrl(false);
        }
      })
      .catch((e) => {
        setNotification({
          id: dayjs().unix(),
          type: TooltipType.ERROR,
          text: t('errors.reauthLink'),
        });
      });
  }, [getlogInUrl, setNotification, t]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <p className={styles.alert}>{t('google.sign')}</p>
      {fetchingUrl ? (
        <Skeleton className={styles.googleButton} animation='wave' />
      ) : (
        <button className={styles.googleButton} onClick={openGoogle}>
          <GoogleIcon />
          {t('google.withGoogle')}
        </button>
      )}
    </div>
  );
};

export default WithGoogle;
