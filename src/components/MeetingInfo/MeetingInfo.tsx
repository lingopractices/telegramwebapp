import React from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import { ReactComponent as UpArrow } from '@assets/icons/up-arrow.svg';
import QuestionItem from '@components/QuestionItem/QuestionItem';
import classNames from 'classnames';
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
        {t('meeting.meeting')} <em>#</em>
        {`${id}`}
      </h2>
      <div className={styles.content}>
        <span className={styles.line}>
          {t('meetingInfo.date')}:{' '}
          <span className={styles.paseted}>{dayjs(meetingDate).format(DAY_MONTH_YAER)}</span>
        </span>
        <span className={styles.line}>
          {t('meetingInfo.time')}:{' '}
          <span className={styles.paseted}>{dayjs(meetingDate).format(HOUR_MINUTE)}</span>
        </span>
        <span className={styles.line}>
          {t('meeting.participants')}:{' '}
          <span className={styles.paseted}>{maxParticipantsCount}</span>
        </span>
        <span className={styles.line}>
          {t('meeting.free')}
          <span className={styles.paseted}> {freePlaces} </span>
          {t('meeting.from')}
          <span className={styles.paseted}> {maxParticipantsCount} </span>
          {t('meeting.places')}
        </span>
        <span className={styles.line}>
          {t('meeting.creatorFrom')}:{' '}
          <span className={styles.paseted}>
            {userCreator.countryName}, {t(`gender.${userCreator.gender}`)}
          </span>
        </span>
        <span className={styles.line}>
          {t('meetingInfo.topic')}: <span className={styles.paseted}>{topic.name}</span>
        </span>
        <span onClick={toggleOpenQuestions} className={classNames(styles.line, styles.questions)}>
          {t('meeting.questions')}
          {isOpenQuestions ? (
            <UpArrow className={styles.arrow} />
          ) : (
            <DownArrow className={styles.arrow} />
          )}
        </span>
        {isOpenQuestions && (
          <div className={styles.questionWrapper}>
            {topic.questions.map((question) => (
              <QuestionItem key={question} label={question} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingInfo;
