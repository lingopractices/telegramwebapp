import React, { ReactNode } from 'react';

import Button from '@components/Button/Button';

import styles from './SubmitButton.module.scss';

interface ISubmitButtonProps {
  onClick: () => void;
  title?: string;
  loading?: boolean;
  isActive?: boolean;
  children?: ReactNode;
  containerClass?: string;
}

const SubmitButton: React.FC<ISubmitButtonProps> = ({
  onClick,
  title,
  isActive = true,
  loading,
  children,
  containerClass,
}) => (
  <div className={styles.submitButton}>
    <Button
      onClick={onClick}
      title={title}
      disabled={!isActive}
      loading={loading}
      containerClass={containerClass || styles.buttonClass}
    >
      {children}
    </Button>
  </div>
);

export default React.memo(SubmitButton);
