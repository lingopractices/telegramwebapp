import React, { useCallback } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import classNames from 'classnames';

import styles from './ParticipantItem.module.scss';

interface IParticipantItemProps {
  count: number;
  selected: boolean;
  containerClass?: string;
  onChangeParticipant: (count: number) => void;
}

const ParticipantItem: React.FC<IParticipantItemProps> = ({
  count,
  selected,
  containerClass,
  onChangeParticipant,
}) => {
  const handleChangeParticipants = useCallback(() => {
    onChangeParticipant(count);
  }, [count, onChangeParticipant]);

  return (
    <div className={classNames(styles.container, containerClass)}>
      <RadioItem
        id={count}
        radioGroupName='participants'
        label={`${count}`}
        onChange={handleChangeParticipants}
        isSelected={selected}
      />
    </div>
  );
};

export default React.memo(ParticipantItem);
