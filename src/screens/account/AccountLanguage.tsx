import React, { useCallback, useEffect, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { languagePendingSelector, languagesSelector } from '@store/languages/selectors';
import { updateProfileAction } from '@store/profile/actions';
import {
  getPracticeLanguageSelector,
  getProfileDataSelector,
  pendingUpdateUserSelector,
} from '@store/profile/selectors';
import { popularLanguagesIds } from 'common/constants';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH } from 'routing/routing.constants';

const AccountInterfaceLanguage: React.FC = () => {
  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const practiceLanguage = useSelector(getPracticeLanguageSelector);
  const user = useSelector(getProfileDataSelector);
  const [newPracticeLanguageId, setNewPracticeLanguageId] = useState(practiceLanguage?.id);
  const languages = useSelector(languagesSelector);
  const languagesPending = useSelector(languagePendingSelector);
  const pendingChangeLanguage = useSelector(pendingUpdateUserSelector);
  const updateProfile = useActionWithDeferred(updateProfileAction);
  const { t } = useTranslation();

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
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <LanguageList
        popularLanguagesIds={popularLanguagesIds}
        languages={languages}
        onChangeLanguage={setNewPracticeLanguageId}
        defaultLanguageId={newPracticeLanguageId}
      />
      <SubmitButton
        onClick={handleSubmit}
        title={newPracticeLanguageId ? t('button.submit') : t('language.choose')}
        isActive={!!newPracticeLanguageId}
        loading={languagesPending || pendingChangeLanguage}
      />
    </>
  );
};

export default AccountInterfaceLanguage;
