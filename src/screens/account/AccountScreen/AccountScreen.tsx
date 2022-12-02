import React, { useCallback, useEffect } from 'react';

import InfoItem from '@components/InfoItem/InfoItem';
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
  INSTANT_MAIN_PATH,
} from 'routing/routing.constants';

import ChangeTheme from './ChangeTheme/ChangeTheme';

import styles from './AccountScreen.module.scss';

const AccountScreen: React.FC = () => {
  const user = useSelector(getProfileDataSelector);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setBackButtonOnClick } = useTgBackButton(true);

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

  return (
    <div className={styles.container}>
      <div className={styles.upRow}>
        <h2>{t('account.myAccount')}</h2>
        <ChangeTheme />
      </div>
      <div className={styles.warpper}>
        <InfoItem
          title={t('account.info.practiceLang')}
          value={user?.practiceLanguage && user.practiceLanguage.name}
          onClick={openPracticeLanguages}
          containerClass={styles.itemContainer}
        />
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
        <InfoItem
          title={t('account.info.interfaceLang')}
          value={user?.interfaceLanguage && user.interfaceLanguage.name}
          onClick={openInterfaceLanguages}
          containerClass={styles.itemContainer}
        />
        <InfoItem
          title={t('account.info.gender')}
          value={user?.gender && t(`gender.${user.gender}`)}
          onClick={() => {}}
          containerClass={styles.itemContainer}
        />
      </div>
    </div>
  );
};

export default AccountScreen;
