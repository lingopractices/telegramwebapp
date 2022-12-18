import React, { useCallback, useEffect, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import useTgBackButton from '@hooks/useTgBackButton';
import { cancelUpdateAlertAcion, updateAlertAction } from '@store/alerts/actions';
import { alertByLanguageIdSelector, updateAlertPendingSelector } from '@store/alerts/selectors';
import { setNotificationAction } from '@store/app-notifications/actions';
import { AxiosErros } from '@store/common/axios-errors';
import { languageByIdSelector } from '@store/languages/selectors';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { LanguageLevel } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ACCOUNT_NOTIFICATIONS_PATH } from 'routing/routing.constants';
import { CreateAlertType } from 'screens/types';

import styles from './EditAlert.module.scss';

const EditAlert = () => {
  const { id: languageId } = useParams();
  const location = useLocation();
  const [alertData, setAlertData] = useState<CreateAlertType>(location.state);
  const language = useSelector(languageByIdSelector(languageId));
  const alert = useSelector(alertByLanguageIdSelector(languageId));
  const [languageLevels, setLanguageLevels] = useState(alert?.languageLevel || LanguageLevel.None);
  const updateAlertPending = useSelector(updateAlertPendingSelector);
  const updateAlert = useActionWithDeferred(updateAlertAction);
  const navigate = useNavigate();
  const setNotification = useActionWithDispatch(setNotificationAction);
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { t } = useTranslation();
  const cancelUpdateAlert = useActionWithDispatch(cancelUpdateAlertAcion);

  useEffect(
    () => () => {
      if (updateAlertPending && alert?.id) {
        cancelUpdateAlert(alert.id);
      }
    },
    [updateAlertPending, alert?.id, cancelUpdateAlert],
  );

  const handleBack = useCallback(() => {
    if (alertData.rootPath) {
      navigate(alertData.rootPath);
    }
  }, [alertData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [setBackButtonOnClick, handleBack]);

  const handleSaveChanges = useCallback(() => {
    if (languageId && alert?.id) {
      updateAlert({
        id: alert.id,
        languageId,
        languageLevel: languageLevels,
      })
        .then(() => {
          navigate(ACCOUNT_NOTIFICATIONS_PATH);
          setNotification({
            id: dayjs().unix(),
            type: TooltipType.SUCCESS,
            text: t(languageLevels ? 'notifications.editLevels' : 'notifications.editDeleted'),
          });
        })
        .catch((e: AxiosError) => {
          if (e.code !== AxiosErros.Cancelled) {
            setNotification({
              id: dayjs().unix(),
              type: TooltipType.ERROR,
              text: t('errors.notificationEdit'),
            });
          }
        });
    }
  }, [languageId, alert, languageLevels, updateAlert, setNotification, navigate, t]);

  return (
    <div className={styles.container}>
      <h2>{t('notifications.language')}</h2>
      <p className={styles.chosenLanguage}>{language?.name}</p>
      <LevelList
        title={t('notifications.levels')}
        multiple={!!true}
        defaultLevelId={languageLevels}
        onChangeLevel={setLanguageLevels}
      />
      <SubmitButton
        title={t(languageLevels !== LanguageLevel.None ? 'button.save' : 'button.delete')}
        onClick={handleSaveChanges}
        loading={updateAlertPending}
      />
    </div>
  );
};

export default EditAlert;
