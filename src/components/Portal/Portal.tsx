import { useEffect, ReactNode } from 'react';

import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: ReactNode }) => {
  const rootPortal = document.getElementById('root-portal');
  const element = document.createElement('div');
  element.style.cssText = 'display: flex; justify-content: center; z-Index: 100000000';

  useEffect(() => {
    rootPortal?.appendChild(element);
    return () => {
      rootPortal?.removeChild(element);
    };
  }, [rootPortal, element]);

  return createPortal(children, element);
};

export default Portal;
