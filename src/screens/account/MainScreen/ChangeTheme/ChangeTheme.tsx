import React, { useCallback, useRef } from 'react';

import { ReactComponent as Moon } from '@assets/icons/moon.svg';
import { ReactComponent as Sun } from '@assets/icons/sun.svg';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { useSwipe } from '@hooks/use-swipe';
import { changeThemeAction } from '@store/profile/actions';
import { Theme } from '@store/profile/features/models/theme';
import { themeSelector } from '@store/profile/selectors';
import classNames from 'classnames';
import { ANIMATION_DURATION } from 'common/constants';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';

import styles from './ChangeTheme.module.scss';

const ChangeTheme: React.FC = () => {
  const theme = useSelector(themeSelector);
  const themeRef = useRef<HTMLDivElement>(null);
  const changeTheme = useActionWithDispatch(changeThemeAction);

  const toDarkTheme = useCallback(() => {
    themeRef.current?.classList.add(styles.toDark);
    debounce((t: Theme) => changeTheme(t), ANIMATION_DURATION)(Theme.DARK);
  }, [changeTheme]);

  const toLightTheme = useCallback(() => {
    themeRef.current?.classList.add(styles.toLight);
    debounce((t: Theme) => changeTheme(t), ANIMATION_DURATION)(Theme.LIGHT);
  }, [changeTheme]);

  useSwipe(themeRef, undefined, undefined, toDarkTheme, toLightTheme);

  const handleToggleTheme = useCallback(
    () => (theme === Theme.LIGHT ? toDarkTheme() : toLightTheme()),
    [theme, toDarkTheme, toLightTheme],
  );

  return (
    <div className={styles.container} onClick={handleToggleTheme}>
      <div
        className={classNames(styles.circle, {
          [`${styles.light}`]: theme === Theme.LIGHT,
          [`${styles.dark}`]: theme === Theme.DARK,
        })}
        ref={themeRef}
      >
        {theme === Theme.LIGHT ? <Sun /> : <Moon />}
      </div>
    </div>
  );
};

export default React.memo(ChangeTheme);
