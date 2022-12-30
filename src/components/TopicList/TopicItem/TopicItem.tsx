import React, { RefObject, useCallback } from 'react';

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

const TopicItem = React.forwardRef<HTMLLIElement, ITopicItemProps>(
  ({ id, name, isSelected, onChange }, ref) => {
    const handleClick = useCallback(() => {
      onChange(id);
    }, [onChange, id]);

    return (
      <li
        ref={ref as RefObject<HTMLLIElement>}
        onClick={handleClick}
        className={classNames(styles.container, { [styles.selectedTopic]: isSelected })}
      >
        <div className={styles.content}>
          <span>{name}</span>
          {isSelected ? (
            <UpArrow className={styles.arrow} />
          ) : (
            <DownArrow className={styles.arrow} />
          )}
        </div>
      </li>
    );
  },
);

export default React.memo(TopicItem);
