import React, { useCallback, useEffect, useRef } from 'react';

import { ReactComponent as CloseIcon } from '@assets/icons/close.svg';
import { ReactComponent as InfoIcon } from '@assets/icons/info.svg';
import Portal from '@components/Portal/Portal';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { removeNotificationAction } from '@store/notifications/actions';
import { currentNotificationSelector } from '@store/notifications/selectors';
import { NOTIFICATION_DURATON } from 'common/constants';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';

import styles from './Tooltip.module.scss';

export const enum TooltipType {
  INFO,
  ERROR,
  SUCCESS,
}

export type ErrorTooltipType = {
  state: boolean | undefined;
  text: string;
};

const Tooltip: React.FC = () => {
  const currentNotif = useSelector(currentNotificationSelector);
  const removeNotification = useActionWithDispatch(removeNotificationAction);
  const containerRef = useRef<HTMLDivElement>(null);

  const animatedClose = useCallback(() => {
    if (currentNotif) {
      containerRef.current?.classList.add(styles.closeTooltip);

      if (containerRef.current) {
        containerRef.current.onanimationend = () => removeNotification(currentNotif.id);
      }
    }
  }, [currentNotif, removeNotification]);

  const closeToolTip = debounce(animatedClose, NOTIFICATION_DURATON);

  const handleClose = useCallback(() => {
    closeToolTip.cancel();
    animatedClose();
  }, [closeToolTip, animatedClose]);

  useEffect(() => {
    if (currentNotif) {
      containerRef.current?.classList.add(styles.openTooltip);
      closeToolTip();
    }
  }, [closeToolTip, currentNotif]);

  return (
    <Portal>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.icon}>
          <InfoIcon />
        </div>
        <div className={styles.content}>{currentNotif?.text}</div>
        <div className={styles.close}>
          <CloseIcon onClick={handleClose} />
        </div>
      </div>
    </Portal>
  );
};

export default Tooltip;
