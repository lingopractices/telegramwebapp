import { useCallback, useEffect } from 'react';

import { MainButtonParams } from '../telegram/types';

type MainButtonType = {
  setMainButtonOnClick: (fn: () => void) => void;
  setMainButtonParams: (obj: MainButtonParams) => void;
  setLoadingMainButton: (state: boolean) => void;
};

let btnClickHandlerFn: () => void = () => {};

function useTgMainButton(
  isVisibleMainButton: boolean,
  isEnabledMainButton: boolean,
  defaultTextMainButton?: string,
): MainButtonType {
  const handleMainBtnClicked = useCallback(() => {
    if (btnClickHandlerFn) {
      btnClickHandlerFn();
    }
  }, []);

  useEffect(() => {
    window.Telegram.WebApp.onEvent('mainButtonClicked', handleMainBtnClicked);

    return () => {
      window.Telegram.WebApp.offEvent('mainButtonClicked', handleMainBtnClicked);
    };
  }, [handleMainBtnClicked]);

  const setMainButtonOnClick = useCallback((fn: () => void) => {
    btnClickHandlerFn = fn;
  }, []);

  const setMainButtonParams = useCallback((obj: MainButtonParams) => {
    window.Telegram.WebApp.MainButton.setParams({
      ...obj,
    });
  }, []);

  const setLoadingMainButton = useCallback((state: boolean) => {
    if (state) {
      window.Telegram.WebApp.MainButton.showProgress(state);
    } else {
      window.Telegram.WebApp.MainButton.hideProgress();
    }
  }, []);

  useEffect(() => {
    if (defaultTextMainButton) {
      setMainButtonParams({
        is_active: isEnabledMainButton,
        is_visible: isVisibleMainButton,
        text: defaultTextMainButton,
      });
    } else {
      setMainButtonParams({
        is_active: isEnabledMainButton,
        is_visible: isVisibleMainButton,
      });
    }
  }, [isEnabledMainButton, isVisibleMainButton, defaultTextMainButton, setMainButtonParams]);

  return {
    setMainButtonOnClick,
    setMainButtonParams,
    setLoadingMainButton,
  };
}

export default useTgMainButton;
