import { useCallback, useEffect, useState } from 'react';

import { MainButton, MainButtonParams } from '../telegram/types';

type MainButtonType = {
  setMainButtonOnClick: (fn: () => void) => void;
  setMainButtonParams: (obj: MainButtonParams) => void;
  setLoadingMainButton: (state: boolean) => void;
  devButton: MainButton;
};

let btnClickHandlerFn: () => void = () => {};

const useTgMainButton = (
  isVisibleMainButton: boolean,
  isEnabledMainButton: boolean,
  defaultTextMainButton?: string,
): MainButtonType => {
  const [devButton, setDevButton] = useState<MainButton>({
    ...window.Telegram.WebApp.MainButton,
  });

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

  const setMainButtonParams = useCallback(
    (obj: MainButtonParams) => {
      window.Telegram.WebApp.MainButton.setParams({
        ...obj,
      });

      setDevButton({ ...window.Telegram.WebApp.MainButton });
    },
    [setDevButton],
  );

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
    devButton,
  };
};

export default useTgMainButton;
