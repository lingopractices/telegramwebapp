import React, { useCallback, useMemo } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import { participantsCountIds } from 'common/constants';
import { useTranslation } from 'react-i18next';

import styles from './ParticipantsCount.module.scss';

interface IParticipiantsCount {
  defaultParticipiants?: number;
  onChangeParticipiants: (peopleNumber: number) => void;
}

const ParticipantsCount: React.FC<IParticipiantsCount> = ({
  defaultParticipiants,
  onChangeParticipiants,
}) => {
  const participiants = useMemo(() => [...participantsCountIds], []);
  const { t } = useTranslation();

  const handleChangeParticipantsCount = useCallback(
    (id: number | string) => {
      onChangeParticipiants(Number(id));
    },
    [onChangeParticipiants],
  );

  return (
    <div className={styles.container}>
      <h2>{t('participants.chooseParticipants').toUpperCase()}</h2>
      <div className={styles.countWrapper}>
        {participiants.map((count) => (
          <RadioItem
            id={count}
            key={count}
            containerClass={styles.item}
            radioGroupName='languages'
            label={count.toString()}
            onChange={handleChangeParticipantsCount}
            isSelected={count === defaultParticipiants}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticipantsCount;