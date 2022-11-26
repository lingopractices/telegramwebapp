import React, { useCallback, useRef } from 'react';

import { ReactComponent as Moon } from '@assets/icons/moon.svg';
import { ReactComponent as Sun } from '@assets/icons/sun.svg';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
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

  const handleToggleTheme = useCallback(() => {
    let newTheme: Theme;

    if (theme === Theme.LIGHT) {
      themeRef.current?.classList.add(styles.toDark);
      newTheme = Theme.DARK;
    } else {
      themeRef.current?.classList.add(styles.toLight);
      newTheme = Theme.LIGHT;
    }

    debounce((t: Theme) => changeTheme(t), ANIMATION_DURATION)(newTheme);
  }, [theme, changeTheme]);

  return (
    <div className={styles.container} onClick={handleToggleTheme}>
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
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
