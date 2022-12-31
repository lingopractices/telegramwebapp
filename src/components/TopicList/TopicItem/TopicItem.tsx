import React, { RefObject, useCallback } from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import { ReactComponent as UpArrow } from '@assets/icons/up-arrow.svg';
import classNames from 'classnames';
import { ITopic } from 'lingopractices-models';

import styles from './TopicItem.module.scss';

interface ITopicItemProps {
  topic: ITopic;
  isSelected: boolean;
  onChange: (topic: ITopic) => void;
}

const TopicItem = React.forwardRef<HTMLLIElement, ITopicItemProps>(
  ({ topic, isSelected, onChange }, ref) => {
    const handleClick = useCallback(() => {
      onChange(topic);
    }, [onChange, topic]);

    return (
      <li
        ref={ref as RefObject<HTMLLIElement>}
        onClick={handleClick}
        className={classNames(styles.container, { [styles.selectedTopic]: isSelected })}
      >
        <div className={styles.content}>
          <span>{topic.name}</span>
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
