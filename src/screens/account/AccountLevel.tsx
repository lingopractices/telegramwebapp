import React, { useCallback, useEffect, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { updateProfileAction } from '@store/profile/actions';
import {
  getLanguageLevelSelector,
  getProfileDataSelector,
  pendingUpdateUserSelector,
} from '@store/profile/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH } from 'routing/routing.constants';

const AccountLevel: React.FC = () => {
  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams, setLoadingMainButton } = useTgMainButton(
    true,
    false,
  );
  const user = useSelector(getProfileDataSelector);
  const languageLevel = useSelector(getLanguageLevelSelector);
  const [newLanguageLevel, setNewLanguageLevel] = useState(languageLevel);
  const pendingUpdateProfile = useSelector(pendingUpdateUserSelector);
  const updateProfile = useActionWithDeferred(updateProfileAction);

  useEffect(() => {
    if (newLanguageLevel) {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    } else {
      setMainButtonParams({ text: 'CHOOSE A LEVEL', is_active: false });
    }
  }, [newLanguageLevel, setMainButtonParams]);

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
          })
          .catch((e) => {});
      } else {
        handleBack();
      }
    }
  }, [newLanguageLevel, languageLevel, user, updateProfile, handleBack]);

  useEffect(() => {
    setMainButtonOnClick(handleSubmit);
  }, [handleSubmit, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  useEffect(() => {
    setLoadingMainButton(pendingUpdateProfile);
  }, [pendingUpdateProfile, setLoadingMainButton]);

  return <LevelList onChangeLevel={setNewLanguageLevel} dafaultLevelId={newLanguageLevel} />;
};

export default AccountLevel;
