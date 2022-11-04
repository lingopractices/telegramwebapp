import { useCallback, useEffect, useState } from 'react';

import expandWindow from '@utils/expandWindow';

type BackButtonType = {
  setBackButtonOnClick: (fn: () => void) => void;
  showBackButton: () => void;
  hideBackButton: () => void;
};

const useTgBackButton = (isVisibleBackButton: boolean): BackButtonType => {
  const [backFunction, setBackFunction] = useState<() => void>();

  const setBackButtonOnClick = useCallback(
    (fn: () => void) => {
      window.Telegram.WebApp.BackButton.onClick(fn);
      setBackFunction(() => () => fn);
    },
    [setBackFunction],
  );

  const showBackButton = useCallback(() => {
    window.Telegram.WebApp.BackButton.show();
  }, []);

  const hideBackButton = useCallback(() => {
    window.Telegram.WebApp.BackButton.hide();
  }, []);

  useEffect(
    () => () => {
      if (backFunction) {
        window.Telegram.WebApp.BackButton.offClick(backFunction);
      }
    },
    [backFunction],
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
