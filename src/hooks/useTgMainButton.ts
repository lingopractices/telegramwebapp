import { useCallback, useEffect } from 'react';

import { MainButtonParams } from '../telegram/types';

type MainButtonType = {
  setMainButtonOnClick: (fn: () => void) => void;
  setMainButtonParams: (obj: MainButtonParams) => void;
  setLoadingMainButton: (state: boolean) => void;
};

let btnClickHandlerFn: () => void = () => {};

const useTgMainButton = (
  isVisibleMainButton: boolean,
  isEnabledMainButton: boolean,
  defaultTextMainButton?: string,
): MainButtonType => {
  const handleMainBtnClicked = useCallback(() => {
    if (btnClickHandlerFn) {
      btnClickHandlerFn();
    }
  }, [btnClickHandlerFn]);

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
      if (!obj.text) {
        window.Telegram.WebApp.MainButton.setParams({ ...obj, text: defaultTextMainButton });
        return;
      }

      window.Telegram.WebApp.MainButton.setParams(obj);
    },
    [defaultTextMainButton],
  );

  const setLoadingMainButton = useCallback(
    (state: boolean) => {
      if (state) {
        setMainButtonParams({ is_active: false });
        window.Telegram.WebApp.MainButton.showProgress(state);
      } else {
        setMainButtonParams({ is_active: true });
        window.Telegram.WebApp.MainButton.hideProgress();
      }
    },
    [setMainButtonParams],
  );

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
};

export default useTgMainButton;
