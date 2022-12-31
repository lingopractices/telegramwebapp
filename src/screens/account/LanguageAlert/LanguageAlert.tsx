import React, { useCallback, useEffect } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import { useBackSwipe } from '@hooks/use-swipe';
import useTgBackButton from '@hooks/useTgBackButton';
import { alertsSelector } from '@store/alerts/selectors';
import { replaceInUrl } from '@utils/replace-in-url';
import { popularLanguagesIds } from 'common/constants';
import { ILanguage } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ACCOUNT_NOTIFICATIONS_CREATE_PATH,
  ACCOUNT_NOTIFICATIONS_EDIT_PATH,
  ACCOUNT_NOTIFICATIONS_LANGUAGES_PATH,
} from 'routing/routing.constants';
import { CreateAlertType } from 'screens/types';

import styles from './LanguageAlert.module.scss';

const LanguageAlert = () => {
  const location = useLocation();
  const alertData: CreateAlertType = location.state;
  const alertPreferences = useSelector(alertsSelector);
  const { setBackButtonOnClick } = useTgBackButton(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBack = useCallback(() => {
    navigate(ACCOUNT_NOTIFICATIONS_CREATE_PATH, { state: alertData });
  }, [alertData, navigate]);

  useBackSwipe(handleBack);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [setBackButtonOnClick, handleBack]);

  const handleChangeLanguage = useCallback(
    (language: ILanguage) => {
      let newAlertData: CreateAlertType;

      if (alertData?.language === language) {
        newAlertData = { ...alertData, language };
      } else {
        newAlertData = { language };
      }

      if (
        alertPreferences?.some((alertItem) => alertItem.languageId === newAlertData?.language?.id)
      ) {
        if (newAlertData?.language) {
          navigate(
            replaceInUrl(ACCOUNT_NOTIFICATIONS_EDIT_PATH, ['id', newAlertData.language.id]),
            {
              state: { rootPath: ACCOUNT_NOTIFICATIONS_LANGUAGES_PATH },
            },
          );
        }
      } else {
        navigate(ACCOUNT_NOTIFICATIONS_CREATE_PATH, {
          state: newAlertData,
        });
      }
    },
    [alertData, alertPreferences, navigate],
  );

  return (
    <div className={styles.container}>
      <LanguageList
        defaultLanguage={alertData?.language}
        popularLanguagesIds={popularLanguagesIds}
        onChangeLanguage={handleChangeLanguage}
        title={t('notifications.selectLang')}
      />
    </div>
  );
};

export default LanguageAlert;
