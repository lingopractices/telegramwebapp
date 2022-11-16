import React, { useCallback, useEffect, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { updateProfileAction } from '@store/profile/actions';
import { getLanguageLevelSelector, getProfileDataSelector } from '@store/profile/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH } from 'routing/routing.constants';

const AccountLevel: React.FC = () => {
  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const user = useSelector(getProfileDataSelector);
  const languageLevel = useSelector(getLanguageLevelSelector);
  const [newLanguageLevel, setNewLanguageLevel] = useState(languageLevel);
  const updateProfile = useActionWithDeferred(updateProfileAction);
  const { t } = useTranslation();

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
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <LevelList onChangeLevel={setNewLanguageLevel} defaultLevelId={newLanguageLevel} />
      <SubmitButton
        onClick={handleSubmit}
        title={newLanguageLevel ? t('button.submit') : t('level.choose')}
        isActive={!!newLanguageLevel}
      />
    </>
  );
};

export default AccountLevel;
