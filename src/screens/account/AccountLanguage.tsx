import React, { useCallback, useEffect, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { getLanguagesAction } from '@store/languages/actions';
import { languagesSelector } from '@store/languages/selectors';
import { updateProfileAction } from '@store/profile/actions';
import {
  getPracticeLanguageSelector,
  getProfileDataSelector,
  pendingUpdateUserSelector,
} from '@store/profile/selectors';
import { popularLanguagesIds } from 'common/constants';
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
  const practiceLanguage = useSelector(getPracticeLanguageSelector);
  const user = useSelector(getProfileDataSelector);
  const [newPracticeLanguageId, setNewPracticeLanguageId] = useState(practiceLanguage?.id);
  const languages = useSelector(languagesSelector);
  const pendingUpdateProfile = useSelector(pendingUpdateUserSelector);
  const getLanguages = useActionWithDispatch(getLanguagesAction);
  const updateProfile = useActionWithDeferred(updateProfileAction);

  useEffect(() => {
    if (newPracticeLanguageId) {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    } else {
      setMainButtonParams({ text: 'CHOOSE A LANGUAGE', is_active: false });
    }
  }, [newPracticeLanguageId, setMainButtonParams]);

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
          })
          .catch((e) => {});
      } else {
        handleBack();
      }
    }
  }, [user, newPracticeLanguageId, practiceLanguage?.id, handleBack, updateProfile]);

  useEffect(() => {
    setMainButtonOnClick(handleSubmit);
  }, [handleSubmit, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  useEffect(() => {
    if (!languages.length) {
      getLanguages();
    }
  }, [languages, getLanguages]);

  useEffect(() => {
    setLoadingMainButton(pendingUpdateProfile);
  }, [pendingUpdateProfile, setLoadingMainButton]);

  return (
    <LanguageList
      popularLanguagesIds={popularLanguagesIds}
      languages={languages}
      onChangeLanguage={setNewPracticeLanguageId}
      dafaultLanguageId={newPracticeLanguageId}
    />
  );
};

export default AccountInterfaceLanguage;
