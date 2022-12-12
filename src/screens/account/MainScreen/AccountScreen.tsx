import React, { useCallback, useEffect, useMemo } from 'react';

import InfoItem from '@components/InfoItem/InfoItem';
import SkeletItem from '@components/SkeletItem/SkeletItem';
import { alertsExistSelector, alertsPendingSelector } from '@store/alerts/selectors';
import { languagePendingSelector } from '@store/languages/selectors';
import { getProfileDataSelector } from '@store/profile/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import { LanguageLevel } from 'lingopractices-models';
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
  const languagesPending = useSelector(languagePendingSelector);
  const alertsPending = useSelector(alertsPendingSelector);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setBackButtonOnClick } = useTgBackButton(true);

  const skeletItem = useMemo(
    () => (
      <SkeletItem count={1} width='165px' height='103px' containerClass={styles.skeletContainer} />
    ),
    [],
  );

  const handleBack = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
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

  const openLocation = useCallback(() => {
    navigate(ACCOUNT_LOCATION_PATH);
  }, [navigate]);

  const openNotifications = useCallback(() => {
    navigate(ACCOUNT_NOTIFICATIONS_PATH);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.upRow}>
        <h2>{t('account.myAccount')}</h2>
        <ChangeTheme />
      </div>
      <div className={styles.warpper}>
        {languagesPending ? (
          skeletItem
        ) : (
          <InfoItem
            title={t('account.info.practiceLang')}
            value={user?.practiceLanguage && user.practiceLanguage.name}
            onClick={openPracticeLanguages}
            containerClass={styles.itemContainer}
          />
        )}
        <InfoItem
          title={t('account.info.level')}
          value={
            user?.languageLevel !== LanguageLevel.None
              ? t(`levels.${user?.languageLevel}`)
              : t(`notSet`)
          }
          onClick={openLevels}
          containerClass={styles.itemContainer}
        />
        <InfoItem
          title={t('account.info.location')}
          value={user?.countryName && user?.countryName}
          onClick={openLocation}
          containerClass={styles.itemContainer}
        />
        {languagesPending ? (
          skeletItem
        ) : (
          <InfoItem
            title={t('account.info.interfaceLang')}
            value={user?.interfaceLanguage && user.interfaceLanguage.name}
            onClick={openInterfaceLanguages}
            containerClass={styles.itemContainer}
          />
        )}
        <InfoItem
          title={t('account.info.gender')}
          value={user?.gender && t(`gender.${user.gender}`)}
          onClick={() => {}}
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
