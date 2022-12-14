import React, { useCallback, useEffect, useMemo, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import SelectNextScreen from '@components/SelectNextScreen/SelectNextScreen';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { useBackSwipe } from '@hooks/use-swipe';
import useTgBackButton from '@hooks/useTgBackButton';
import { cancelCreateAlertAcion, createAlertAction } from '@store/alerts/actions';
import { createAlertPendingSelector } from '@store/alerts/selectors';
import { setNotificationAction } from '@store/app-notifications/actions';
import { AxiosErros } from '@store/common/axios-errors';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { LanguageLevel } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ACCOUNT_NOTIFICATIONS_LANGUAGES_PATH,
  ACCOUNT_NOTIFICATIONS_PATH,
} from 'routing/routing.constants';
import { CreateAlertType } from 'screens/types';

import styles from './CreateAlert.module.scss';

const CreateAlert = () => {
  const location = useLocation();
  const [alertData, setAlertData] = useState<CreateAlertType>(location.state);
  const language = alertData?.language;
  const createAlertPending = useSelector(createAlertPendingSelector);
  const createAlert = useActionWithDeferred(createAlertAction);
  const setNotification = useActionWithDispatch(setNotificationAction);
  const { setBackButtonOnClick } = useTgBackButton(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const cancelCreateAlert = useActionWithDispatch(cancelCreateAlertAcion);

  useEffect(
    () => () => {
      if (createAlertPending) {
        cancelCreateAlert();
      }
    },
    [createAlertPending, cancelCreateAlert],
  );

  const handleSelectLanguage = useCallback(() => {
    navigate(ACCOUNT_NOTIFICATIONS_LANGUAGES_PATH, { state: alertData });
  }, [alertData, navigate]);

  const handleChangeLevel = useCallback(
    (level: LanguageLevel) => {
      setAlertData((prev) => ({ ...prev, languageLevels: level }));
    },
    [setAlertData],
  );

  const handleBack = useCallback(() => {
    navigate(ACCOUNT_NOTIFICATIONS_PATH);
  }, [navigate]);

  useBackSwipe(handleBack);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [setBackButtonOnClick, handleBack]);

  const handleCreateAlert = useCallback(() => {
    const { language: newLaguage, languageLevels } = alertData;

    if (newLaguage && languageLevels) {
      createAlert({
        languageId: newLaguage.id,
        languageLevel: languageLevels,
      })
        .then(() => {
          handleBack();
          setNotification({
            id: dayjs().unix(),
            type: TooltipType.SUCCESS,
            text: t('notifications.created'),
          });
        })
        .catch((e: AxiosError) => {
          if (e.code !== AxiosErros.Cancelled) {
            setNotification({
              id: dayjs().unix(),
              type: TooltipType.ERROR,
              text: t('errors.notificationCreate'),
            });
          }
        });
    }
  }, [alertData, createAlert, setNotification, handleBack, t]);

  const buttonTitle = useMemo(() => {
    let resultTitle: string;
    if (!alertData?.language) {
      resultTitle = t('notifications.chooseLanguage');
    } else if (!alertData?.languageLevels) {
      resultTitle = t('notifications.atLeastLevel');
    } else {
      resultTitle = t('button.save');
    }

    return resultTitle;
  }, [alertData, t]);

  return (
    <div className={styles.container}>
      <h2>{t('notifications.addAlert')}</h2>
      <h3>{t('notifications.chooseLang')}</h3>
      <SelectNextScreen
        title={language ? language.name : t('notifications.selectLang')}
        containerClass={classNames(styles.selectContainer, {
          [styles.chosenLanguage]: !!alertData?.language,
        })}
        onClick={handleSelectLanguage}
      />
      {language && (
        <>
          <h3>{t('notifications.chooseLevels')}</h3>
          <LevelList
            defaultLevelId={alertData?.languageLevels || LanguageLevel.None}
            multiple={!!true}
            onChangeLevel={handleChangeLevel}
          />
        </>
      )}
      <SubmitButton
        onClick={handleCreateAlert}
        title={buttonTitle}
        loading={createAlertPending}
        isActive={!!alertData?.language && !!alertData?.languageLevels}
      />
    </div>
  );
};

export default CreateAlert;
