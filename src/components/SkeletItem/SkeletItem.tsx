import React, { useMemo } from 'react';

import { Skeleton } from '@mui/material';

interface ISkeletItemProps {
  count: number;
  height?: string;
  width?: string;
  containerClass?: string;
}

const SkeletItem: React.FC<ISkeletItemProps> = ({ count, height, width, containerClass }) => {
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
          height={height}
          width={width}
          animation='wave'
          key={item}
          className={containerClass}
        />
      ))}
    </>
  );
};

export default SkeletItem;
