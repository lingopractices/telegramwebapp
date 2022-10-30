import React, { useCallback, useEffect, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { updateProfileAction } from '@store/profile/actions';
import { getInterfaceLanguageSelector, getProfileDataSelector } from '@store/profile/selectors';
import { interfaceLanguages } from 'common/constants';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH } from 'routing/routing.constants';

const AccountInterfaceLanguage: React.FC = () => {
  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams, setLoadingMainButton } = useTgMainButton(
    true,
    false,
  );
  const interfaceLanguage = useSelector(getInterfaceLanguageSelector);
  const user = useSelector(getProfileDataSelector);
  const [newInterfaceLanguageId, setNewInterfaceLanguageId] = useState(interfaceLanguage?.id);
  const updateProfile = useActionWithDeferred(updateProfileAction);

  useEffect(() => {
    if (newInterfaceLanguageId) {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    } else {
      setMainButtonParams({ text: 'CHOOSE A LANGUAGE', is_active: false });
    }
  }, [newInterfaceLanguageId, setMainButtonParams]);

  const handleBack = useCallback(() => {
    navigate(ACCOUNT_PATH);
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    if (user && newInterfaceLanguageId) {
      if (newInterfaceLanguageId !== interfaceLanguage?.id) {
        setLoadingMainButton(true);
        updateProfile({
          ...user,
          userId: user.id,
          practiceLanguageId: user.practiceLanguage.id,
          interfaceLanguageId: newInterfaceLanguageId,
        })
          .then(() => {
            setLoadingMainButton(false);
            handleBack();
          })
          .catch((e) => {
            setLoadingMainButton(false);
          });
      } else {
        handleBack();
      }
    }
  }, [
    user,
    newInterfaceLanguageId,
    interfaceLanguage?.id,
    updateProfile,
    handleBack,
    setLoadingMainButton,
  ]);

  useEffect(() => {
    setMainButtonOnClick(handleSubmit);
  }, [handleSubmit, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <LanguageList
      languages={interfaceLanguages}
      onChangeLanguage={setNewInterfaceLanguageId}
      defaultLanguageId={newInterfaceLanguageId}
    />
  );
};

export default AccountInterfaceLanguage;
