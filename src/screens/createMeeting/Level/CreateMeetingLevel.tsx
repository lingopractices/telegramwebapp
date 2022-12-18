import React, { useCallback, useEffect, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
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
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const currentLevel = useSelector(getLanguageLevelSelector);
  const [newLevel, setNewLevel] = useState(
    meetingData?.level?.languageLevel || currentLevel || LanguageLevel.None,
  );
  const { t } = useTranslation();
  const { setBackButtonOnClick } = useTgBackButton(true);

  useEffect(() => {
    if (newLevel) {
      setMeetingData((prev) => ({
        ...prev,
        level: {
          languageLevel: newLevel,
          data: {
            path: CREATE_LEVELS_PATH,
            title: t(
              newLevel > LanguageLevel.Beginner ? 'meetingInfo.levels' : 'meetingInfo.level',
            ),
            value: t(`levels.${newLevel}`),
          },
        },
      }));
    }
  }, [newLevel, setMeetingData, t]);

  const handleBack = useCallback(() => {
    navigate(CREATE_LANGUAGES_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_TOPICS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <StepBox meetingData={meetingData} containerClass={styles.stepBoxContainer} />
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
