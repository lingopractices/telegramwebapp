import { useCallback, useEffect } from 'react';

import expandWindow from '@utils/expandWindow';

type BackButtonType = {
  setBackButtonOnClick: (fn: () => void) => void;
  showBackButton: () => void;
  hideBackButton: () => void;
};

const useTgBackButton = (isVisibleBackButton: boolean): BackButtonType => {
  const setBackButtonOnClick = useCallback((fn: () => void) => {
    window.Telegram.WebApp.BackButton.onClick(fn);
    return fn;
  }, []);

  const showBackButton = useCallback(() => {
    window.Telegram.WebApp.BackButton.show();
  }, []);

  const hideBackButton = useCallback(() => {
    window.Telegram.WebApp.BackButton.hide();
  }, []);

  useEffect(
    () => () => {
      window.Telegram.WebApp.BackButton.offClick(() => setBackButtonOnClick);
    },
    [setBackButtonOnClick],
  );

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
