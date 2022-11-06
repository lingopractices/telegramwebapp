import React, { useCallback, useEffect, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { updateProfileAction } from '@store/profile/actions';
import { getLanguageLevelSelector, getProfileDataSelector } from '@store/profile/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useTranslation } from 'react-i18next';
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
  const updateProfile = useActionWithDeferred(updateProfileAction);
  const { t } = useTranslation();

  useEffect(() => {
    if (newLanguageLevel) {
      setMainButtonParams({ text: t('button.submit').toUpperCase(), is_active: true });
    } else {
      setMainButtonParams({ text: t('level.choose').toUpperCase(), is_active: false });
    }
  }, [newLanguageLevel, setMainButtonParams, t]);

  const handleBack = useCallback(() => {
    navigate(ACCOUNT_PATH);
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    if (user && newLanguageLevel) {
      if (newLanguageLevel !== languageLevel) {
        setLoadingMainButton(true);
        updateProfile({
          ...user,
          userId: user.id,
          practiceLanguageId: user.practiceLanguage.id,
          interfaceLanguageId: user.interfaceLanguage.id,
          languageLevel: newLanguageLevel,
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
  }, [newLanguageLevel, languageLevel, user, updateProfile, handleBack, setLoadingMainButton]);

  useEffect(() => {
    setMainButtonOnClick(handleSubmit);
  }, [handleSubmit, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return <LevelList onChangeLevel={setNewLanguageLevel} defaultLevelId={newLanguageLevel} />;
};

export default AccountLevel;
