import React, { useCallback, useEffect, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { setNotificationAction } from '@store/app-notifications/actions';
import { languagesSelector } from '@store/languages/selectors';
import { updateProfileAction } from '@store/profile/actions';
import {
  getPracticeLanguageSelector,
  getProfileDataSelector,
  pendingUpdateUserSelector,
} from '@store/profile/selectors';
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
  const [newPracticeLanguageId, setNewPracticeLanguageId] = useState(practiceLanguage?.id);
  const languages = useSelector(languagesSelector);
  const pendingChangeLanguage = useSelector(pendingUpdateUserSelector);
  const updateProfile = useActionWithDeferred(updateProfileAction);
  const { t } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);

  const handleBack = useCallback(() => {
    navigate(ACCOUNT_PATH);
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    if (user && newPracticeLanguageId) {
      if (newPracticeLanguageId !== practiceLanguage?.id) {
        updateProfile({
          ...user,
          userId: user.id,
          practiceLanguageId: newPracticeLanguageId,
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
          .catch(() =>
            setNotification({
              id: dayjs().unix(),
              type: TooltipType.ERROR,
              text: t('errors.lang'),
            }),
          );
      } else {
        handleBack();
      }
    }
  }, [
    user,
    newPracticeLanguageId,
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
        languages={languages}
        onChangeLanguage={setNewPracticeLanguageId}
        defaultLanguageId={newPracticeLanguageId}
        title={t('language.choosePracticeLang')}
      />
      <SubmitButton
        onClick={handleSubmit}
        title={newPracticeLanguageId ? t('button.submit') : t('language.choose')}
        isActive={!!newPracticeLanguageId}
        loading={pendingChangeLanguage}
      />
    </div>
  );
};

export default AccountLanguage;
