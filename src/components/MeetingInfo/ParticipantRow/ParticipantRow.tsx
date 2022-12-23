import React from 'react';

import classNames from 'classnames';

import styles from './ParticipantRow.module.scss';

interface IparticipantProps {
  firstName: string;
  gender: string;
  country: string;
  constinerClass?: string;
}

const ParticipantRow: React.FC<IparticipantProps> = ({
  firstName,
  gender,
  country,
  constinerClass,
}) => (
  <div className={classNames(styles.container, constinerClass)}>
    <span className={styles.item}>{firstName}</span>
    <span className={styles.item}>{country}</span>
    <span className={styles.item}>{gender}</span>
  </div>
);

export default React.memo(ParticipantRow);
