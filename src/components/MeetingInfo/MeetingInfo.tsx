import React from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import { ReactComponent as UpArrow } from '@assets/icons/up-arrow.svg';
import QuestionItem from '@components/QuestionItem/QuestionItem';
import { DAY_MONTH_YAER, HOUR_MINUTE } from 'common/constants';
import dayjs from 'dayjs';
import useToggledState from 'hooks/useToggleState';
import { IMeeting } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h2>
        {t('meeting.meeting').toUpperCase()}
        <em>#</em>
        {`${id}`}
      </h2>
      <div className={styles.content}>
        <div className={styles.timeLine}>
          <span className={styles.capitalize}>
            {t('meetingInfo.date')}: &nbsp;
            <span className={styles.data}>{dayjs(meetingDate).format(DAY_MONTH_YAER)}</span>
          </span>
          <span className={styles.capitalize}>
            {t('meetingInfo.time')}: &nbsp;
            <span className={styles.data}>{dayjs(meetingDate).format(HOUR_MINUTE)}</span>
          </span>
        </div>
        <span>
          {t('meeting.participants')}: &nbsp;
          <span className={styles.data}>{maxParticipantsCount}</span>
        </span>
        <span>
          {t('meeting.free')}
          <span className={styles.data}>&nbsp; {freePlaces} &nbsp; </span>
          {t('meeting.from')}
          <span className={styles.data}>&nbsp; {maxParticipantsCount} &nbsp;</span>
          {t('meeting.places')}
        </span>
        <span>
          {t('meeting.creatorFrom')}: &nbsp;
          <span className={styles.data}>
            {userCreator.countryName},&nbsp;{t(`gender.${userCreator.gender}`)}
          </span>
        </span>
        <span className={styles.capitalize}>
          {t('meetingInfo.topic')}: &nbsp;
          <span className={styles.data}>{topic.name}</span>
        </span>
        <span onClick={toggleOpenQuestions} className={styles.questions}>
          {t('meeting.questions')}
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
