import React, { useCallback, useEffect, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { updateProfileAction } from '@store/profile/actions';
import { getInterfaceLanguageSelector, getProfileDataSelector } from '@store/profile/selectors';
import { interfaceLanguages } from 'common/constants';
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
  const updateProfile = useActionWithDeferred(updateProfileAction);
  const { t, i18n } = useTranslation();

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
          })
          .catch((e) => {});
      } else {
        handleBack();
      }
    }
  }, [i18n, user, newInterfaceLanguageId, interfaceLanguage?.id, updateProfile, handleBack]);

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
      />
    </>
  );
};

export default AccountInterfaceLanguage;
