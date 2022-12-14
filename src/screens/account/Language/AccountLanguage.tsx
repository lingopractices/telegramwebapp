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
  getPracticeLanguageSelector,
  getProfileDataSelector,
  pendingUpdateUserSelector,
} from '@store/profile/selectors';
import { AxiosError } from 'axios';
import { popularLanguagesIds } from 'common/constants';
import dayjs from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH } from 'routing/routing.constants';

import styles from './AccountLanguage.module.scss';

const AccountLanguage: React.FC = () => {
  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const practiceLanguage = useSelector(getPracticeLanguageSelector);
  const user = useSelector(getProfileDataSelector);
  const [newPracticeLanguage, setNewPracticeLanguage] = useState(practiceLanguage);
  const pendingChangeLanguage = useSelector(pendingUpdateUserSelector);
  const updateProfile = useActionWithDeferred(updateProfileAction);
  const { t } = useTranslation();
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
    if (user && newPracticeLanguage) {
      if (newPracticeLanguage.id !== practiceLanguage?.id) {
        updateProfile({
          ...user,
          userId: user.id,
          practiceLanguageId: newPracticeLanguage.id,
          interfaceLanguageId: user.interfaceLanguage.id,
        })
          .then(() => {
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
    user,
    newPracticeLanguage,
    practiceLanguage?.id,
    handleBack,
    updateProfile,
    setNotification,
    t,
  ]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <LanguageList
        popularLanguagesIds={popularLanguagesIds}
        onChangeLanguage={setNewPracticeLanguage}
        defaultLanguage={newPracticeLanguage}
        title={t('language.choosePracticeLang')}
        containerClass={styles.listClass}
      />
      <SubmitButton
        onClick={handleSubmit}
        title={newPracticeLanguage ? t('button.submit') : t('language.choose')}
        isActive={!!newPracticeLanguage}
        loading={pendingChangeLanguage}
      />
    </div>
  );
};

export default AccountLanguage;
