import React, { useCallback, useEffect, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { setNotificationAction } from '@store/notifications/actions';
import { updateProfileAction } from '@store/profile/actions';
import {
  getInterfaceLanguageSelector,
  getProfileDataSelector,
  pendingUpdateUserSelector,
} from '@store/profile/selectors';
import { interfaceLanguages } from 'common/constants';
import dayjs from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH } from 'routing/routing.constants';

const AccountInterfaceLanguage: React.FC = () => {
  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const interfaceLanguage = useSelector(getInterfaceLanguageSelector);
  const user = useSelector(getProfileDataSelector);
  const [newInterfaceLanguageId, setNewInterfaceLanguageId] = useState(interfaceLanguage?.id);
  const pendingChangeLanguage = useSelector(pendingUpdateUserSelector);
  const updateProfile = useActionWithDeferred(updateProfileAction);
  const { t, i18n } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);

  const handleBack = useCallback(() => {
    navigate(ACCOUNT_PATH);
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    if (user && newInterfaceLanguageId) {
      if (newInterfaceLanguageId !== interfaceLanguage?.id) {
        updateProfile({
          ...user,
          userId: user.id,
          practiceLanguageId: user.practiceLanguage.id,
          interfaceLanguageId: newInterfaceLanguageId,
        })
          .then(() => {
            i18n?.changeLanguage(newInterfaceLanguageId);
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
    i18n,
    user,
    newInterfaceLanguageId,
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
    <>
      <LanguageList
        languages={interfaceLanguages}
        onChangeLanguage={setNewInterfaceLanguageId}
        defaultLanguageId={newInterfaceLanguageId}
      />
      <SubmitButton
        onClick={handleSubmit}
        title={newInterfaceLanguageId ? t('button.submit') : t('language.choose')}
        isActive={!!newInterfaceLanguageId}
        loading={pendingChangeLanguage}
      />
    </>
  );
};

export default AccountInterfaceLanguage;
