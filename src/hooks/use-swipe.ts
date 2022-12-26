import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { SWIPE_WIDTH } from 'common/constants';

function getTouches(evt: TouchEvent) {
  return evt.touches;
}

export function useSwipe(
  element: RefObject<HTMLElement>,
  onTop?: () => void,
  onDown?: () => void,
  onLeft?: () => void,
  onRight?: () => void,
  rangeOffset?: number,
) {
  const [xDown, setXDown] = useState(0);
  const [yDown, setYDown] = useState(0);

  const handleTouchStart = useCallback((evt: TouchEvent) => {
    const firstTouch = getTouches(evt)[0];
    setXDown(firstTouch.clientX);
    setYDown(firstTouch.clientY);
  }, []);

  const handleTouchMove = useCallback(
    (evt: TouchEvent) => {
      if (!xDown || !yDown) {
        return;
      }

      const xUp = evt.touches[0].clientX;
      const yUp = evt.touches[0].clientY;

      const xDiff = xDown - xUp;
      const yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0 && onLeft) {
          if (rangeOffset) {
            if (xDown < rangeOffset) {
              onLeft();
            }

            return;
          }

          onLeft();
        } else {
          if (onRight) {
            if (rangeOffset) {
              if (xDown < rangeOffset) {
                onRight();
              }

              return;
            }

            onRight();
          }
        }
      } else {
        /* eslint no-lonely-if: 0 */
        if (yDiff > 0 && onTop) {
          if (rangeOffset) {
            if (yDown < rangeOffset) {
              onTop();
            }

            return;
          }

          onTop();
        } else {
          if (onDown) {
            if (rangeOffset) {
              if (yDown < rangeOffset) {
                onDown();
              }

              return;
            }

            onDown();
          }
        }
      }
    },
    [xDown, yDown, rangeOffset, onTop, onDown, onRight, onLeft],
  );

  useEffect(() => {
    const currentElement = element.current;

    if (currentElement) {
      currentElement.addEventListener('touchstart', handleTouchStart);
      currentElement.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      currentElement?.removeEventListener('touchstart', handleTouchStart);
      currentElement?.removeEventListener('touchmove', handleTouchMove);
    };
  }, [element, handleTouchStart, handleTouchMove]);
}

export function useBackSwipe(fn: () => void) {
  const html = document.querySelector('html');
  const htmlRef = useRef(html);

  useSwipe(htmlRef, undefined, undefined, undefined, fn, SWIPE_WIDTH);
}
