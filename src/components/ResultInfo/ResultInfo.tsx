import React, { useCallback, useMemo } from 'react';

import InfoItem from '@components/InfoItem/InfoItem';
import { languagesSelector } from '@store/languages/selectors';
import { getTopicsSelector } from '@store/topics/selectors';
import { DAY_MONTH_YAER, HOUR_MINUTE } from 'common/constants';
import dayjs from 'dayjs';
import { ITopic } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  CREATE_DATE_PATH,
  CREATE_LANGUAGES_PATH,
  CREATE_LEVELS_PATH,
  CREATE_PARTICIPANTS_PATH,
  CREATE_TIME_PATH,
  CREATE_TOPICS_PATH,
} from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

import styles from './ResultInfo.module.scss';

interface IResultInfo {
  meetingData: CreateMeetingType;
}

const ResultInfo: React.FC<IResultInfo> = ({ meetingData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const languages = useSelector(languagesSelector);
  const topics = useSelector(getTopicsSelector);

  const chosenTopic: ITopic | undefined = useMemo(() => {
    if (meetingData) {
      return topics.find((topic) => topic.id === meetingData.topicId);
    }

    return undefined;
  }, [topics, meetingData]);

  const chosenLanguage = useMemo(() => {
    if (meetingData) {
      return languages.find((language) => language.id === meetingData.languageId);
    }
    return undefined;
  }, [languages, meetingData]);

  const openLanguages = useCallback(() => {
    navigate(CREATE_LANGUAGES_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const openLevels = useCallback(() => {
    navigate(CREATE_LEVELS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const openTopics = useCallback(() => {
    navigate(CREATE_TOPICS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const openPraticipiants = useCallback(() => {
    navigate(CREATE_PARTICIPANTS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const openDate = useCallback(() => {
    navigate(CREATE_DATE_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const openTime = useCallback(() => {
    navigate(CREATE_TIME_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  return (
    <div className={styles.container}>
      <h2>{t('meetingInfo.createMeeting').toUpperCase()}</h2>
      <div className={styles.wrapper}>
        <InfoItem
          title={t('meetingInfo.practiceLang').toUpperCase()}
          value={`${chosenLanguage?.name}`}
          onClick={openLanguages}
        />
        <InfoItem
          title={t('meetingInfo.level').toUpperCase()}
          value={`${meetingData?.languageLevel && t(`levels.${meetingData.languageLevel}`)}`}
          onClick={openLevels}
        />
        <InfoItem title='TOPIC' value={`${chosenTopic && chosenTopic.name}`} onClick={openTopics} />
        <InfoItem
          title={t('meetingInfo.participants').toUpperCase()}
          value={`${meetingData?.peopleNumber}`}
          onClick={openPraticipiants}
        />
        <InfoItem
          title={t('meetingInfo.date').toUpperCase()}
          value={dayjs(meetingData?.meetingDate).format(DAY_MONTH_YAER)}
          onClick={openDate}
        />
        <InfoItem
          title={t('meetingInfo.time').toUpperCase()}
          value={dayjs(meetingData?.meetingTime).format(HOUR_MINUTE)}
          onClick={openTime}
        />
      </div>
    </div>
  );
};

export default ResultInfo;
