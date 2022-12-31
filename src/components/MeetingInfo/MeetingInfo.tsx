import React from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import { ReactComponent as UpArrow } from '@assets/icons/up-arrow.svg';
import QuestionItem from '@components/QuestionItem/QuestionItem';
import { Skeleton } from '@mui/material';
import { languageByIdSelector, languagePendingSelector } from '@store/languages/selectors';
import { getProfileDataSelector } from '@store/profile/selectors';
import classNames from 'classnames';
import { DAY_MONTH_YAER, HOUR_MINUTE } from 'common/constants';
import dayjs from 'dayjs';
import useToggledState from 'hooks/useToggleState';
import { Gender, IMeeting } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ParticipantRow from './ParticipantRow/ParticipantRow';

import styles from './MeetingInfo.module.scss';

const MeetingInfo: React.FC<{ meeting: IMeeting }> = ({ meeting }) => {
  const [isOpenQuestions, , , toggleOpenQuestions] = useToggledState(false);
  const [isOpenParticipants, , , toggleOpenParticipants] = useToggledState(false);
  const language = useSelector(languageByIdSelector(meeting?.languageId));
  const user = useSelector(getProfileDataSelector);
  const freePlaces = meeting.maxParticipantsCount - meeting.participants.length;
  const languagesPending = useSelector(languagePendingSelector);
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h2>
        {t('meeting.meeting')} <em>#</em>
        {`${meeting.id}`}
      </h2>
      <div className={styles.content}>
        <span className={styles.line}>
          {t('meetingInfo.practiceLang')}:{'  '}
          {languagesPending ? (
            <Skeleton animation='wave' className={styles.skeletSpace}>
              <span className={styles.value}>{language?.name}</span>
            </Skeleton>
          ) : (
            <span className={styles.value}>{language?.name}</span>
          )}
        </span>
        <span className={styles.line}>
          {t('meetingInfo.level')}:{' '}
          <span className={styles.value}>{t(`levels.${meeting.languageLevel}`)}</span>
        </span>
        <span className={styles.line}>
          {t('meetingInfo.date')}:{' '}
          <span className={styles.value}>{dayjs(meeting.meetingDate).format(DAY_MONTH_YAER)}</span>
        </span>
        <span className={styles.line}>
          {t('meetingInfo.time')}:{' '}
          <span className={styles.value}>{dayjs(meeting.meetingDate).format(HOUR_MINUTE)}</span>
        </span>
        <span className={styles.line}>
          {t('meetingInfo.maxParticipants')}:{' '}
          <span className={styles.value}>{meeting.maxParticipantsCount}</span>
        </span>
        <span className={styles.line}>
          {t('meeting.free')}: <span className={styles.value}>{freePlaces}</span>{' '}
          {t('meeting.from')} <span className={styles.value}>{meeting.maxParticipantsCount}</span>{' '}
          {t('meeting.places')}
        </span>
        <span
          className={classNames(styles.line, styles.clickable, {
            [styles.opened]: isOpenParticipants,
          })}
          onClick={toggleOpenParticipants}
        >
          {t('meetingInfo.participants')}:{' '}
          {isOpenParticipants ? (
            <UpArrow className={styles.arrow} />
          ) : (
            <DownArrow className={styles.arrow} />
          )}
        </span>
        {isOpenParticipants && (
          <div>
            {meeting.participants.map((participant) => (
              <ParticipantRow
                key={participant.userId}
                country={participant.country}
                gender={t(`gender.${participant?.gender || Gender.NotSet}`)}
                firstName={
                  user?.id === participant.userId ? t('meetingInfo.you') : participant.firstName
                }
                constinerClass={styles.participantClass}
              />
            ))}
          </div>
        )}
        <span className={styles.line}>
          {t('meeting.creatorFrom')}:{' '}
          <span className={styles.value}>
            {meeting.userCreator.countryName}, {t(`gender.${meeting.userCreator.gender}`)}
          </span>
        </span>
        <span className={styles.line}>
          {t('meetingInfo.topic')}: <span className={styles.value}>{meeting.topic.name}</span>
        </span>
        <span onClick={toggleOpenQuestions} className={classNames(styles.line, styles.clickable)}>
          {t('meeting.questions')}
          {isOpenQuestions ? (
            <UpArrow className={styles.arrow} />
          ) : (
            <DownArrow className={styles.arrow} />
          )}
        </span>
        {isOpenQuestions && (
          <div className={styles.questionWrapper}>
            {meeting.topic.questions.map((question) => (
              <QuestionItem key={question} label={question} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingInfo;
