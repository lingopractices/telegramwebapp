import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

function getTouches(evt: TouchEvent) {
  return evt.touches;
}

export function useSwipe(element: RefObject<HTMLElement>) {
  const [xDown, setXDown] = useState(0);
  const [yDown, setYDown] = useState(0);
  const [rightSwipe, setRightSwipe] = useState(false);
  const [leftSwipe, setLeftSwipe] = useState(false);
  const [upSwipe, setUpSwipe] = useState(false);
  const [downSwipe, setDownSwipe] = useState(false);

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
        if (xDiff > 0) {
          setLeftSwipe(true);
        } else {
          setRightSwipe(true);
        }
      } else {
        /* eslint no-lonely-if: 0 */
        if (yDiff > 0) {
          setUpSwipe(true);
        } else {
          setDownSwipe(true);
        }
      }
    },
    [xDown, yDown],
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

  const resetSwipe = useCallback(() => {
    setRightSwipe(false);
    setLeftSwipe(false);
    setDownSwipe(false);
    setUpSwipe(false);
    setXDown(0);
    setYDown(0);
  }, []);

  return { rightSwipe, leftSwipe, upSwipe, downSwipe, xDown, yDown, resetSwipe };
}

export function useBackSwipe(fn: () => void) {
  const html = document.querySelector('html');
  const htmlRef = useRef(html);

  const { rightSwipe, xDown } = useSwipe(htmlRef);

  useEffect(() => {
    if (xDown < 20 && rightSwipe) {
      fn();
    }
  }, [rightSwipe, xDown, fn]);
}
