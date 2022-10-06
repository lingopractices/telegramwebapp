import React, { useCallback } from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow-picker.svg';
import { ReactComponent as UpArrow } from '@assets/icons/up-arrow.svg';
import classNames from 'classnames';

import styles from './TopicItem.module.scss';

interface ITopicItemProps {
  label: string;
  isSelected: boolean;
  onChange: (label: string) => void;
}

const TopicItem: React.FC<ITopicItemProps> = ({ label, isSelected, onChange }) => {
  const handleClick = useCallback(() => {
    onChange(label);
  }, [onChange]);

  return (
    <li onClick={handleClick} className={classNames(styles.container, { [styles.selectedTopic]: isSelected })}>
      <span>{label}</span>
      {isSelected ? <UpArrow /> : <DownArrow />}
    </li>
  );
};

export default React.memo(TopicItem);
