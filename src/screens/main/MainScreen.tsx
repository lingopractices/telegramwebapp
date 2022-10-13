import React from 'react';

import Main from '@components/Main/Main';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';

const MainScreen: React.FC = () => {
  useTgBackButton(false);
  useTgMainButton(false, false);

  return <Main />;
};

export default MainScreen;
