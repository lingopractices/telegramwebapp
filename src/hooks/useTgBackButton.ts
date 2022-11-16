import { useCallback, useEffect } from 'react';

import expandWindow from '@utils/expand-window';

type BackButtonType = {
  setBackButtonOnClick: (fn: () => void) => void;
  showBackButton: () => void;
  hideBackButton: () => void;
};

const useTgBackButton = (isVisibleBackButton: boolean): BackButtonType => {
  const setBackButtonOnClick = useCallback((fn: () => void) => {
    window.Telegram.WebApp.onEvent('backButtonClicked', fn);

    return () => {
      window.Telegram.WebApp.offEvent('backButtonClicked', fn);
    };
  }, []);

  const showBackButton = useCallback(() => {
    window.Telegram.WebApp.BackButton.show();
  }, []);

  const hideBackButton = useCallback(() => {
    window.Telegram.WebApp.BackButton.hide();
  }, []);

  useEffect(() => {
    if (isVisibleBackButton) {
      showBackButton();
      expandWindow();
    } else {
      hideBackButton();
    }
  }, [isVisibleBackButton, showBackButton, hideBackButton]);

  return {
    setBackButtonOnClick,
    showBackButton,
    hideBackButton,
  };
};

export default useTgBackButton;
