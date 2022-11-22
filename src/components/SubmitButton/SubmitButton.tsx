import React from 'react';

import Button from '@components/Button/Button';

import styles from './SubmitButton.module.scss';

interface ISubmitButtonProps {
  onClick: () => void;
  title: string;
  loading?: boolean;
  isActive?: boolean;
}

const SubmitButton: React.FC<ISubmitButtonProps> = ({
  onClick,
  title,
  isActive = true,
  loading,
}) => (
  <div className={styles.submitButton}>
    <Button onClick={onClick} title={title.toUpperCase()} disabled={!isActive} loading={loading} />
  </div>
);

export default React.memo(SubmitButton);
