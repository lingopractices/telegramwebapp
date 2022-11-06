import React, { useCallback, useEffect, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { getLanguagesAction } from '@store/languages/actions';
import { languagesSelector } from '@store/languages/selectors';
import { updateProfileAction } from '@store/profile/actions';
import { getPracticeLanguageSelector, getProfileDataSelector } from '@store/profile/selectors';
import { popularLanguagesIds } from 'common/constants';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useTranslation } from 'react-i18next';
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
  const getLanguages = useActionWithDispatch(getLanguagesAction);
  const updateProfile = useActionWithDeferred(updateProfileAction);
  const { t } = useTranslation();

  useEffect(() => {
    if (newPracticeLanguageId) {
      setMainButtonParams({ text: t('button.submit').toUpperCase(), is_active: true });
    } else {
      setMainButtonParams({ text: t('language.choose').toUpperCase(), is_active: false });
    }
  }, [newPracticeLanguageId, setMainButtonParams, t]);

  const handleBack = useCallback(() => {
    navigate(ACCOUNT_PATH);
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    if (user && newPracticeLanguageId) {
      if (newPracticeLanguageId !== practiceLanguage?.id) {
        setLoadingMainButton(true);
        updateProfile({
          ...user,
          userId: user.id,
          practiceLanguageId: newPracticeLanguageId,
          interfaceLanguageId: user.interfaceLanguage.id,
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
    newPracticeLanguageId,
    practiceLanguage?.id,
    handleBack,
    updateProfile,
    setLoadingMainButton,
  ]);

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

  return (
    <LanguageList
      popularLanguagesIds={popularLanguagesIds}
      languages={languages}
      onChangeLanguage={setNewPracticeLanguageId}
      defaultLanguageId={newPracticeLanguageId}
    />
  );
};

export default AccountInterfaceLanguage;
