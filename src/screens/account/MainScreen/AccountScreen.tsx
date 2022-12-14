import React, { useCallback, useEffect, useMemo } from 'react';

import InfoItem from '@components/InfoItem/InfoItem';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { useBackSwipe } from '@hooks/use-swipe';
import { Skeleton } from '@mui/material';
import { getAlertsAction } from '@store/alerts/actions';
import {
  alertsExistSelector,
  alertsPendingSelector,
  alertsSelector,
} from '@store/alerts/selectors';
import { setNotificationAction } from '@store/app-notifications/actions';
import { getProfileDataSelector } from '@store/profile/selectors';
import { LINGO_PRACTICES_TELEGRAM_PATH } from 'common/constants';
import dayjs from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ACCOUNT_INTERFACE_LANGUAGES_PATH,
  ACCOUNT_LANGUAGES_PATH,
  ACCOUNT_LEVELS_PATH,
  ACCOUNT_LOCATION_PATH,
  ACCOUNT_NOTIFICATIONS_PATH,
  INSTANT_MAIN_PATH,
} from 'routing/routing.constants';

import ChangeTheme from './ChangeTheme/ChangeTheme';

import styles from './AccountScreen.module.scss';

const AccountScreen: React.FC = () => {
  const user = useSelector(getProfileDataSelector);
  const notificationsExist = useSelector(alertsExistSelector);
  const alertsPending = useSelector(alertsPendingSelector);
  const alerts = useSelector(alertsSelector);
  const navigate = useNavigate();
  const setNotification = useActionWithDispatch(setNotificationAction);
  const getAlerts = useActionWithDeferred(getAlertsAction);
  const { t } = useTranslation();
  const { setBackButtonOnClick } = useTgBackButton(true);

  useEffect(() => {
    if (!alerts) {
      getAlerts().catch((e) => {
        setNotification({
          id: dayjs().unix(),
          text: t('errors.notifications'),
          type: TooltipType.INFO,
        });
      });
    }
  }, [alerts, getAlerts, setNotification, t]);

  const handleBack = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  useBackSwipe(handleBack);

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

  const openLocation = useCallback(() => {
    navigate(ACCOUNT_LOCATION_PATH);
  }, [navigate]);

  const openNotifications = useCallback(() => {
    navigate(ACCOUNT_NOTIFICATIONS_PATH);
  }, [navigate]);

  const changeGender = useCallback(() => {
    setNotification({
      id: dayjs().unix(),
      text: `${t('gender.change')} <a href="${LINGO_PRACTICES_TELEGRAM_PATH}"> @lingopractices</a>`,
      type: TooltipType.INFO,
    });
  }, [t, setNotification]);

  const skeletItem = useMemo(
    () => (
      <Skeleton className={styles.skeletContainer} animation='wave'>
        <InfoItem
          title='fill'
          value='fill'
          onClick={openLocation}
          containerClass={styles.itemContainer}
        />
      </Skeleton>
    ),
    [openLocation],
  );

  return (
    <div className={styles.container}>
      <div className={styles.upRow}>
        <h2>{t('account.myAccount')}</h2>
        <ChangeTheme />
      </div>
      <div className={styles.wrapper}>
        <InfoItem
          title={t('account.info.practiceLang')}
          value={(user?.practiceLanguage && user.practiceLanguage.name) || t('notSet')}
          onClick={openPracticeLanguages}
          containerClass={styles.itemContainer}
        />
        <InfoItem
          title={t('account.info.level')}
          value={t(`levels.${user?.languageLevel}`)}
          onClick={openLevels}
          containerClass={styles.itemContainer}
        />
        <InfoItem
          title={t('account.info.location')}
          value={user?.countryName ? user.countryName : t('notSet')}
          onClick={openLocation}
          containerClass={styles.itemContainer}
        />

        <InfoItem
          title={t('account.info.interfaceLang')}
          value={(user?.interfaceLanguage && user.interfaceLanguage.name) || t('notSet')}
          onClick={openInterfaceLanguages}
          containerClass={styles.itemContainer}
        />
        <InfoItem
          title={t('account.info.gender')}
          value={user?.gender ? t(`gender.${user.gender}`) : t('notSet')}
          onClick={changeGender}
          containerClass={styles.itemContainer}
        />
        {alertsPending ? (
          skeletItem
        ) : (
          <InfoItem
            title={t('notifications.notifications')}
            value={notificationsExist ? t('notifications.on') : t('notifications.off')}
            onClick={openNotifications}
            containerClass={styles.itemContainer}
          />
        )}
      </div>
    </div>
  );
};

export default AccountScreen;
