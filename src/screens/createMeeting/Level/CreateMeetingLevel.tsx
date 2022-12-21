import React, { useCallback, useEffect, useMemo, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { useBackSwipe } from '@hooks/use-swipe';
import { getLanguageLevelSelector } from '@store/profile/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import { LanguageLevel } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CREATE_LANGUAGES_PATH,
  CREATE_LEVELS_PATH,
  CREATE_TOPICS_PATH,
} from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

import styles from './CreateMeetingLevel.module.scss';

const CreateMeetingLevel: React.FC = () => {
  const location = useLocation();
  const meetingData: CreateMeetingType = location?.state;
  const currentLevel = useSelector(getLanguageLevelSelector);
  const [newLevel, setNewLevel] = useState(
    meetingData?.level?.languageLevel || currentLevel || LanguageLevel.None,
  );
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setBackButtonOnClick } = useTgBackButton(true);

  const locationData = useMemo(() => {
    if (newLevel) {
      return {
        ...meetingData,
        level: {
          languageLevel: newLevel,
          data: {
            path: CREATE_LEVELS_PATH,
            title: t('meetingInfo.level'),
            value: t(`levels.${newLevel}`),
          },
        },
      };
    }

    return meetingData;
  }, [newLevel, meetingData, t]);

  const handleBack = useCallback(() => {
    navigate(CREATE_LANGUAGES_PATH, { state: { ...locationData } });
  }, [locationData, navigate]);

  useBackSwipe(handleBack);

  const handleForward = useCallback(() => {
    navigate(CREATE_TOPICS_PATH, { state: { ...locationData } });
  }, [locationData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <StepBox meetingData={locationData} containerClass={styles.stepBoxContainer} />
      <LevelList
        onChangeLevel={setNewLevel}
        defaultLevelId={newLevel}
        title={t('level.chooseLevel')}
        multiple={false}
      />
      <SubmitButton
        onClick={handleForward}
        title={newLevel ? t('button.continue') : t('level.choose')}
        isActive={!!newLevel}
      />
    </div>
  );
};

export default CreateMeetingLevel;
