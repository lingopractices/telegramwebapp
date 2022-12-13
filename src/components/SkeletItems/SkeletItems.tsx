import React, { ReactNode, useMemo } from 'react';

import { Skeleton } from '@mui/material';
import classNames from 'classnames';

import styles from './SkeletItems.module.scss';

interface ISkeletItemProps {
  count: number;
  height?: string;
  width?: string;
  containerClass?: string;
  children?: ReactNode;
}

const SkeletItems: React.FC<ISkeletItemProps> = ({
  count,
  height,
  width,
  containerClass,
  children,
}) => {
  const meetingsArray = useMemo(
    () =>
      Array(count)
        .fill(1)
        .map((_, index) => index),
    [count],
  );

  return (
    <>
      {meetingsArray.map((item) => (
        <Skeleton
          variant='rectangular'
          animation='wave'
          key={item}
          className={classNames(styles.container, containerClass)}
        >
          {children}
        </Skeleton>
      ))}
    </>
  );
};

export default SkeletItems;
