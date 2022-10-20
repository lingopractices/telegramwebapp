import React from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import { ReactComponent as UpArrow } from '@assets/icons/up-arrow.svg';
import QuestionItem from '@components/QuestionItem/QuestionItem';
import useToggledState from 'hooks/useToggleState';

import styles from './MeetingInfo.module.scss';

interface IMeetingInfo {
  date?: string;
  time?: string;
  topic?: string;
  participantsCount?: number;
  maxParticipantsCount?: number;
  creatorFrom?: string;
  creatorGender?: string;
  questions?: string[];
}

const MeetingInfo: React.FC<IMeetingInfo> = ({
  date,
  time,
  topic,
  participantsCount,
  maxParticipantsCount,
  creatorFrom,
  creatorGender,
  questions,
}) => {
  const [isOpenQuestions, , , toggleOpenQuestions] = useToggledState(false);
  const freePlaces =
    participantsCount && maxParticipantsCount
      ? maxParticipantsCount - participantsCount
      : undefined;

  return (
    <div className={styles.container}>
      <h2>{`MEETING #1`.toUpperCase()}</h2>
      <div className={styles.content}>
        <div className={styles.timeLine}>
          <span>
            Date: &nbsp; <span className={styles.data}>{date}</span>
          </span>
          <span>
            Time: &nbsp; <span className={styles.data}>{time}</span>
          </span>
        </div>
        <span>
          Participiants: &nbsp; <span className={styles.data}>{maxParticipantsCount}</span>
        </span>
        <span>
          Free <span className={styles.data}>&nbsp; {freePlaces} &nbsp; </span> from
          <span className={styles.data}>&nbsp; {maxParticipantsCount} &nbsp;</span> places
        </span>
        <span>
          Creator from: &nbsp;
          <span className={styles.data}>
            {creatorFrom},&nbsp;{creatorGender}
          </span>
        </span>
        <span>
          Topic: &nbsp; <span className={styles.data}>{topic}</span>
        </span>
        <span onClick={toggleOpenQuestions}>
          Questions
          {isOpenQuestions ? (
            <UpArrow className={styles.arrow} />
          ) : (
            <DownArrow className={styles.arrow} />
          )}
        </span>
        {isOpenQuestions &&
          questions &&
          questions.map((question) => <QuestionItem key={question} label={question} />)}
      </div>
    </div>
  );
};

export default MeetingInfo;
