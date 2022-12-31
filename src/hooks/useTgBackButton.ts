import { useCallback, useEffect } from 'react';

import expandWindow from '@utils/expand-window';

type BackButtonType = {
  setBackButtonOnClick: (fn: () => void) => void;
  showBackButton: () => void;
  hideBackButton: () => void;
};

let btnClickHandlerFn: () => void = () => {};

function useTgBackButton(isVisibleBackButton: boolean): BackButtonType {
  const handleBackBtnClicked = useCallback(() => {
    if (btnClickHandlerFn) {
      btnClickHandlerFn();
    }
  }, []);

  useEffect(() => {
    window.Telegram.WebApp.onEvent('backButtonClicked', handleBackBtnClicked);

    return () => {
      window.Telegram.WebApp.offEvent('backButtonClicked', handleBackBtnClicked);
    };
  }, [handleBackBtnClicked]);

  const setBackButtonOnClick = useCallback((fn: () => void) => {
    btnClickHandlerFn = fn;
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
}

export default useTgBackButton;
