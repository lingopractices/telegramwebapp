import React, { RefObject, useMemo } from 'react';

import { useIntersectionObserver, useOnIntersect } from '@hooks/useIntersectionObserver';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';

type InfiniteScrollProps = {
  children: React.ReactNode;
  className?: string;
  hasMore?: boolean;
  onReachBottom?: () => void;
  threshold?: number | Array<number>;
  containerRef: RefObject<HTMLDivElement>;
  triggerMargin?: number;
  debounceTime?: number;
};

const TRIGGER_MARGIN = 1;

const LOAD_MORE_DEBOUNCE = 100;

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  className,
  hasMore,
  onReachBottom = noop,
  threshold = 0.0,
  containerRef,
  triggerMargin = TRIGGER_MARGIN,
  debounceTime = LOAD_MORE_DEBOUNCE,
}) => {
  const forwardsTriggerRef = React.useRef<HTMLDivElement>(null);

  const [loadMoreBottom] = useMemo(
    () => [debounce(onReachBottom, debounceTime, { leading: true, trailing: false })],
    [debounceTime, onReachBottom],
  );

  const { observe: observeIntersection } = useIntersectionObserver(
    {
      rootRef: containerRef,
      margin: triggerMargin,
      threshold,
    },
    (entries) => {
      if (!hasMore) {
        return;
      }
      const triggerEntry = entries.find(({ isIntersecting }) => isIntersecting);

      console.log(triggerEntry);

      if (!triggerEntry) {
        return;
      }

      const { target } = triggerEntry;

      if (target.className === 'bottom-trigger') {
        loadMoreBottom();
      }
    },
  );

  useOnIntersect(forwardsTriggerRef, observeIntersection);

  return (
    <div className={classnames(className)}>
      {children}
      <div ref={forwardsTriggerRef} key='bottom-trigger' className='bottom-trigger' />
    </div>
  );
};

export default InfiniteScroll;
