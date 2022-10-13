import React, { useCallback, useEffect, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH } from 'routing/routing.constants';

const AccountInterfaceLanguage: React.FC = () => {
  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(
    true,
    false,
    'CHOOSE A LANGUAGE',
  );

  const [langId, setLangId] = useState('en');

  const handleChangeLanguage = useCallback(
    (languageId: string) => {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    },
    [setMainButtonParams],
  );

  const handleBack = useCallback(() => {
    navigate(ACCOUNT_PATH);
  }, [navigate]);

  const handleForward = useCallback(() => {
    navigate(ACCOUNT_PATH);
  }, [navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return <LanguageList onChangeLanguage={handleChangeLanguage} dafaultLanguageId={langId} />;
};

export default AccountInterfaceLanguage;
