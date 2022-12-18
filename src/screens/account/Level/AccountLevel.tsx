import React, { useCallback, useEffect, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { setNotificationAction } from '@store/app-notifications/actions';
import { AxiosErros } from '@store/common/axios-errors';
import { cancelUpdateProfileAction, updateProfileAction } from '@store/profile/actions';
import {
  getLanguageLevelSelector,
  getProfileDataSelector,
  pendingUpdateUserSelector,
} from '@store/profile/selectors';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { LanguageLevel } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH } from 'routing/routing.constants';

import styles from './AccountLevel.module.scss';

const AccountLevel: React.FC = () => {
  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const user = useSelector(getProfileDataSelector);
  const languageLevel = useSelector(getLanguageLevelSelector);
  const [newLanguageLevel, setNewLanguageLevel] = useState(languageLevel || LanguageLevel.None);
  const pendingChangeLevel = useSelector(pendingUpdateUserSelector);
  const updateProfile = useActionWithDeferred(updateProfileAction);
  const { t } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);
  const cancelUpdateProfile = useActionWithDispatch(cancelUpdateProfileAction);

  useEffect(
    () => () => {
      if (pendingChangeLevel) {
        cancelUpdateProfile();
      }
    },
    [pendingChangeLevel, cancelUpdateProfile],
  );

  const handleBack = useCallback(() => {
    navigate(ACCOUNT_PATH);
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    if (user && newLanguageLevel) {
      if (newLanguageLevel !== languageLevel) {
        updateProfile({
          ...user,
          userId: user.id,
          practiceLanguageId: user.practiceLanguage.id,
          interfaceLanguageId: user.interfaceLanguage.id,
          languageLevel: newLanguageLevel,
        })
          .then(() => {
            handleBack();
            setNotification({
              id: dayjs().unix(),
              type: TooltipType.SUCCESS,
              text: t('level.changed'),
            });
          })
          .catch((e: AxiosError) => {
            if (e.code !== AxiosErros.Cancelled) {
              setNotification({
                id: dayjs().unix(),
                type: TooltipType.ERROR,
                text: t('errors.level'),
              });
            }
          });
      } else {
        handleBack();
      }
    }
  }, [newLanguageLevel, languageLevel, user, updateProfile, handleBack, setNotification, t]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <LevelList
        onChangeLevel={setNewLanguageLevel}
        defaultLevelId={newLanguageLevel}
        title={t('level.chooseLevel')}
        multiple={false}
      />
      <SubmitButton
        onClick={handleSubmit}
        title={newLanguageLevel ? t('button.submit') : t('level.choose')}
        isActive={!!newLanguageLevel}
        loading={pendingChangeLevel}
      />
    </div>
  );
};

export default AccountLevel;
