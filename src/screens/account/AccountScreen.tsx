import React, { useCallback, useEffect } from 'react';

import Account from '@components/Account/Account';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useNavigate } from 'react-router-dom';
import { INSTANT_MAIN_PATH } from 'routing/routing.constants';

const AccountScreen: React.FC = () => {
  const navigate = useNavigate();

  const { setBackButtonOnClick } = useTgBackButton(true);
  useTgMainButton(false, false);

  const handleBack = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return <Account />;
};

export default AccountScreen;
