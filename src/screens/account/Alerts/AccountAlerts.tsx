import React, { useCallback, useEffect, useMemo } from 'react';

import { ReactComponent as Pluse } from '@assets/icons/pluse.svg';
import AlertBox from '@components/AlertBox/AlertBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { useBackSwipe } from '@hooks/use-swipe';
import useTgBackButton from '@hooks/useTgBackButton';
import { alertsSelector } from '@store/alerts/selectors';
import { languagesSelector } from '@store/languages/selectors';
import { mapLevels } from '@utils/map-levels';
import { replaceInUrl } from '@utils/replace-in-url';
import { INotificationPreferenceDto } from 'lingopractices-models';
import { find } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ACCOUNT_NOTIFICATIONS_CREATE_PATH,
  ACCOUNT_NOTIFICATIONS_EDIT_PATH,
  ACCOUNT_NOTIFICATIONS_PATH,
  ACCOUNT_PATH,
} from 'routing/routing.constants';

import styles from './AccountAlerts.module.scss';

const AccountAlerts: React.FC = () => {
  const alerts = useSelector(alertsSelector);
  const languages = useSelector(languagesSelector);
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAddNewAlert = useCallback(() => {
    navigate(ACCOUNT_NOTIFICATIONS_CREATE_PATH);
  }, [navigate]);

  const handleBack = useCallback(() => {
    navigate(ACCOUNT_PATH);
  }, [navigate]);

  useBackSwipe(handleBack);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [setBackButtonOnClick, handleBack]);

  const handleEditAlert = useCallback(
    (id: string) => {
      navigate(replaceInUrl(ACCOUNT_NOTIFICATIONS_EDIT_PATH, ['id', id]), {
        state: { rootPath: ACCOUNT_NOTIFICATIONS_PATH },
      });
    },
    [navigate],
  );

  const mapAlertToBox = useCallback(
    (alert: INotificationPreferenceDto) => {
      const title = find(languages, (language) => language.id === alert.languageId)?.name;
      const tags = mapLevels(
        find(alerts, (alertItem) => alertItem.languageId === alert.languageId)?.languageLevel,
      )?.map((level) => t(`levels.${level}`));

      if (title && tags && alert.languageLevel && alert?.languageId) {
        return (
          <AlertBox
            id={alert.languageId}
            title={title}
            tags={tags}
            key={alert.id}
            onEdit={handleEditAlert}
          />
        );
      }

      return null;
    },
    [languages, alerts, handleEditAlert, t],
  );

  const renderedAlertBox = useMemo(() => alerts.map(mapAlertToBox), [alerts, mapAlertToBox]);

  return (
    <div className={styles.container}>
      <h2>{t('notifications.notifications')}</h2>
      <p>{t('notifications.wilNotif')}</p>
      <div className={styles.alertsContainer}>{renderedAlertBox}</div>
      <SubmitButton onClick={handleAddNewAlert} containerClass={styles.addNewContainer}>
        <span className={styles.childernContainer}>
          <Pluse />
          {t('notifications.addNew')}
        </span>
      </SubmitButton>
    </div>
  );
};

export default AccountAlerts;
