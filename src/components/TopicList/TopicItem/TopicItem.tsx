import React, { useCallback } from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import { ReactComponent as UpArrow } from '@assets/icons/up-arrow.svg';
import classNames from 'classnames';

import styles from './TopicItem.module.scss';

interface ITopicItemProps {
  id: number;
  name: string;
  isSelected: boolean;
  onChange: (topicId: number) => void;
}

const TopicItem: React.FC<ITopicItemProps> = ({ id, name, isSelected, onChange }) => {
  const handleClick = useCallback(() => {
    onChange(id);
  }, [onChange, id]);

  return (
    <li
      onClick={handleClick}
      className={classNames(styles.container, { [styles.selectedTopic]: isSelected })}
    >
      <span className={classNames({ [styles.stickyTitle]: isSelected })}>{name}</span>
      {isSelected ? <UpArrow className={styles.arrow} /> : <DownArrow className={styles.arrow} />}
    </li>
  );
};

export default React.memo(TopicItem);
