import { useCallback, useEffect } from 'react';

type BackButtonType = {
  setBackButtonOnClick: (fn: () => void) => void;
  showBackButton: () => void;
  hideBackButton: () => void;
};

const useTgBackButton = (isVisibleMainButton: boolean): BackButtonType => {
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
    if (isVisibleMainButton) {
      showBackButton();
    } else {
      hideBackButton();
    }
  }, [isVisibleMainButton, showBackButton, hideBackButton]);

  return {
    setBackButtonOnClick,
    showBackButton,
    hideBackButton,
  };
};

export default useTgBackButton;
