import React, { useCallback, useMemo } from 'react';

import { participantsCountIds } from 'common/constants';
import { useTranslation } from 'react-i18next';

import ParticipantItem from './ParticipantItem/ParticipantItem';

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
    (count: number) => {
      onChangeParticipiants(count);
    },
    [onChangeParticipiants],
  );

  return (
    <div className={styles.container}>
      <h2>{t('participants.chooseParticipants')}</h2>
      <div className={styles.countWrapper}>
        {participiants.map((count) => (
          <ParticipantItem
            count={count}
            selected={count === defaultParticipiants}
            onChangeParticipant={handleChangeParticipantsCount}
            key={count}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticipantsCount;
