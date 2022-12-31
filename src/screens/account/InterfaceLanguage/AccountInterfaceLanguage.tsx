import React, { useCallback, useEffect, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { useBackSwipe } from '@hooks/use-swipe';
import { setNotificationAction } from '@store/app-notifications/actions';
import { AxiosErros } from '@store/common/axios-errors';
import { cancelUpdateProfileAction, updateProfileAction } from '@store/profile/actions';
import {
  getInterfaceLanguageSelector,
  getProfileDataSelector,
  pendingUpdateUserSelector,
} from '@store/profile/selectors';
import { AxiosError } from 'axios';
import { interfaceLanguages } from 'common/constants';
import dayjs from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH } from 'routing/routing.constants';

import styles from './AccountInterfaceLanguage.module.scss';

const AccountInterfaceLanguage: React.FC = () => {
  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const interfaceLanguage = useSelector(getInterfaceLanguageSelector);
  const user = useSelector(getProfileDataSelector);
  const [newInterfaceLanguage, setNewInterfaceLanguage] = useState(interfaceLanguage);
  const pendingChangeLanguage = useSelector(pendingUpdateUserSelector);
  const updateProfile = useActionWithDeferred(updateProfileAction);
  const { t, i18n } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);
  const cancelUpdateProfile = useActionWithDispatch(cancelUpdateProfileAction);

  useEffect(
    () => () => {
      if (pendingChangeLanguage) {
        cancelUpdateProfile();
      }
    },
    [pendingChangeLanguage, cancelUpdateProfile],
  );

  const handleBack = useCallback(() => {
    navigate(ACCOUNT_PATH);
  }, [navigate]);

  useBackSwipe(handleBack);

  const handleSubmit = useCallback(() => {
    if (user && newInterfaceLanguage) {
      if (newInterfaceLanguage.id !== interfaceLanguage?.id) {
        updateProfile({
          ...user,
          userId: user.id,
          practiceLanguageId: user.practiceLanguage.id,
          interfaceLanguageId: newInterfaceLanguage.id,
        })
          .then(() => {
            i18n?.changeLanguage(newInterfaceLanguage.id);
            handleBack();
            setNotification({
              id: dayjs().unix(),
              type: TooltipType.SUCCESS,
              text: t('language.changed'),
            });
          })
          .catch((e: AxiosError) => {
            if (e.code !== AxiosErros.Cancelled) {
              setNotification({
                id: dayjs().unix(),
                type: TooltipType.ERROR,
                text: t('errors.lang'),
              });
            }
          });
      } else {
        handleBack();
      }
    }
  }, [
    i18n,
    user,
    newInterfaceLanguage,
    interfaceLanguage?.id,
    updateProfile,
    handleBack,
    setNotification,
    t,
  ]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <LanguageList
        languages={interfaceLanguages}
        onChangeLanguage={setNewInterfaceLanguage}
        defaultLanguage={newInterfaceLanguage}
        title={t('language.chooseInterfaceLang')}
      />
      <SubmitButton
        onClick={handleSubmit}
        title={newInterfaceLanguage ? t('button.submit') : t('language.choose')}
        isActive={!!newInterfaceLanguage}
        loading={pendingChangeLanguage}
      />
    </div>
  );
};

export default AccountInterfaceLanguage;
