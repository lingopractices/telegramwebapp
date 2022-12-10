import React, { useCallback } from 'react';

import Button from '@components/Button/Button';
import Tag from '@components/Tag/Tag';
import { useTranslation } from 'react-i18next';

import styles from './AlertBox.module.scss';

interface IAlertBox {
  id: string;
  title: string;
  tags: string[];
  onEdit: (id: string) => void;
}

const AlertBox: React.FC<IAlertBox> = ({ id, tags, title, onEdit }) => {
  const { t } = useTranslation();

  const handleEdit = useCallback(() => {
    onEdit(id);
  }, [id, onEdit]);

  return (
    <div className={styles.container}>
      <div className={styles.topLine}>
        <span>{title}</span>
        <Button containerClass={styles.edit} onClick={handleEdit}>
          {t('notifications.edit')}
        </Button>
      </div>
      <div className={styles.tagWrapper}>
        {tags.map((tag) => (
          <Tag key={tag} title={tag} containerClass={styles.tagContainer} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(AlertBox);
