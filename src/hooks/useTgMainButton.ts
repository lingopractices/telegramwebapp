import { useCallback, useEffect } from 'react';

import { MainButtonParams } from '../telegram/types';

type MainButtonType = {
  setMainButtonOnClick: (fn: () => void) => void;
  setMainButtonParams: (obj: MainButtonParams) => void;
  setLoadingMainButton: (state: boolean) => void;
};

const useTgMainButton = (
  isVisibleMainButton: boolean,
  isEnabledMainButton: boolean,
  defaultTextMainButton?: string,
): MainButtonType => {
  const setMainButtonOnClick = useCallback((fn: () => void) => {
    window.Telegram.WebApp.MainButton.onClick(fn);
    return fn;
  }, []);

  const setLoadingMainButton = useCallback(
    (state: boolean) => window.Telegram.WebApp.MainButton.showProgress(state),
    [],
  );

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

  useEffect(
    () => () => {
      window.Telegram.WebApp.MainButton.offClick(() => setMainButtonOnClick);
    },
    [setMainButtonOnClick],
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
