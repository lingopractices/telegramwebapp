import { useCallback, useEffect } from 'react';

import { MainButtonParams } from '../telegram/types';

type MainButtonType = {
  setBackButtonOnClick: (fn: () => void) => void;
  setMainButtonParams: (obj: MainButtonParams) => void;
  setLoadingMainButton: (state: boolean) => void;
};

const useTgMainButton = (
  isVisibleMainButton: boolean,
  isEnabledMainButton: boolean,
  defaultTextMainButton: string,
): MainButtonType => {
  const setBackButtonOnClick = useCallback((fn: () => void) => {
    window.Telegram.WebApp.MainButton.onClick(fn);
    return fn;
  }, []);

  const setLoadingMainButton = useCallback(
    (state: boolean) => window.Telegram.WebApp.MainButton.showProgress(state),
    [],
  );

  const setMainButtonParams = useCallback(
    (obj: MainButtonParams) => window.Telegram.WebApp.MainButton.setParams(obj),
    [],
  );

  useEffect(
    () => () => {
      window.Telegram.WebApp.MainButton.offClick(() => setBackButtonOnClick);
    },
    [setBackButtonOnClick],
  );

  useEffect(() => {
    setMainButtonParams({
      is_active: isEnabledMainButton,
      is_visible: isVisibleMainButton,
      text: defaultTextMainButton,
    });
  }, [isEnabledMainButton, isVisibleMainButton, defaultTextMainButton]);

  return {
    setBackButtonOnClick,
    setMainButtonParams,
    setLoadingMainButton,
  };
};

export default useTgMainButton;
