import React, { useMemo } from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import { ReactComponent as UpArrow } from '@assets/icons/up-arrow.svg';
import QuestionItem from '@components/QuestionItem/QuestionItem';
import { getFormattedDate } from '@utils/dateUtils';
import { genderLabelsMap } from '@utils/enumLabelsMap';
import { DAY_MONTH_YAER, HOUR_MINUTE } from 'common/constants';
import dayjs from 'dayjs';
import useToggledState from 'hooks/useToggleState';
import { IMeeting } from 'lingopractices-models';

import styles from './MeetingInfo.module.scss';

const MeetingInfo: React.FC<IMeeting> = ({
  id,
  meetingDate,
  topic,
  participantsCount,
  maxParticipantsCount,
  userCreator,
  googleMeetLink,
}) => {
  const [isOpenQuestions, , , toggleOpenQuestions] = useToggledState(false);
  const freePlaces = maxParticipantsCount - participantsCount;

  const formattedDate = useMemo(
    () => meetingDate && getFormattedDate(dayjs(meetingDate), DAY_MONTH_YAER),
    [meetingDate],
  );

  const formattedTime = useMemo(
    () => meetingDate && getFormattedDate(dayjs(meetingDate), HOUR_MINUTE),
    [meetingDate],
  );

  return (
    <div className={styles.container}>
      <h2>
        {`MEETING `.toUpperCase()}
        <em>#</em>
        {`${id}`}
      </h2>
      <div className={styles.content}>
        <div className={styles.timeLine}>
          <span>
            Date: &nbsp; <span className={styles.data}>{formattedDate}</span>
          </span>
          <span>
            Time: &nbsp; <span className={styles.data}>{formattedTime}</span>
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
            {userCreator.countryName},&nbsp;{genderLabelsMap[userCreator.gender]}
          </span>
        </span>
        <span>
          Topic: &nbsp; <span className={styles.data}>{topic.name}</span>
        </span>
        <span onClick={toggleOpenQuestions} className={styles.questions}>
          Questions
          {isOpenQuestions ? (
            <UpArrow className={styles.arrow} />
          ) : (
            <DownArrow className={styles.arrow} />
          )}
        </span>
        {isOpenQuestions &&
          topic.questions.map((question) => <QuestionItem key={question} label={question} />)}
      </div>
    </div>
  );
};

export default MeetingInfo;
