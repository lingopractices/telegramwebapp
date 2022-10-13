import React, { useCallback, useEffect, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { LanguageLevel } from 'lingopractices-models';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH } from 'routing/routing.constants';

const AccountLevel: React.FC = () => {
  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(
    true,
    false,
    'CHOOSE A LEVEL',
  );
  const [levelId, setLevelId] = useState(1);

  const handleChangeLevel = useCallback(
    (languageLevel: LanguageLevel) => {
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

  return <LevelList onChangeLevel={handleChangeLevel} dafaultLevelId={levelId} />;
};

export default AccountLevel;
