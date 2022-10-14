import React, { useCallback } from 'react';

import InfoItem from '@components/InfoItem/InfoItem';
import { DAY_MONTH_YAER, HOUR_MINUTE } from 'common/constants';
import dayjs from 'dayjs';
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
      <h2>CREATE MEETING</h2>
      <div className={styles.wrapper}>
        <InfoItem
          title='PRACTICE LANGUAGE'
          value={`${meetingData?.languageId}`}
          onClick={openLanguages}
        />
        <InfoItem title='LEVEL' value={`${meetingData?.languageLevel}`} onClick={openLevels} />
        <InfoItem title='TOPIC' value={`${meetingData?.topicId}`} onClick={openTopics} />
        <InfoItem
          title='PARTICIPIANTS NUMBER'
          value={`${meetingData?.peopleNumber}`}
          onClick={openPraticipiants}
        />
        <InfoItem
          title='DATE'
          value={dayjs(meetingData?.meetingAt).format(DAY_MONTH_YAER)}
          onClick={openDate}
        />
        <InfoItem
          title='TIME'
          value={dayjs(meetingData?.meetingAt).format(HOUR_MINUTE)}
          onClick={openTime}
        />
      </div>
    </div>
  );
};

export default ResultInfo;
