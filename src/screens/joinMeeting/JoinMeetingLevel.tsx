import React, { useCallback, useEffect, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { getLanguageLevelSelector } from '@store/profile/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { JOIN_DATE_PATH, JOIN_LANGUAGES_PATH, JOIN_LEVELS_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

const JoinMeetingLevel: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<JoinMeetingType>(location?.state?.meetingData);
  const currentLevel = useSelector(getLanguageLevelSelector);
  const [newLevel, setNewLevel] = useState(meetingData?.level?.languageLevel || currentLevel);
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (newLevel) {
      setMeetingData((prev) => ({
        ...prev,
        level: {
          languageLevel: newLevel,
          data: {
            path: JOIN_LEVELS_PATH,
            title: t('meetingInfo.level'),
            value: t(`levels.${newLevel}`),
          },
        },
      }));
    }
  }, [newLevel, setMeetingData, t]);

  const handleBack = useCallback(() => {
    navigate(JOIN_LANGUAGES_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(JOIN_DATE_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <StepBox meetingData={meetingData} />
      <LevelList onChangeLevel={setNewLevel} defaultLevelId={newLevel} />
      <SubmitButton
        onClick={handleForward}
        title={newLevel ? t('button.submit') : t('level.choose')}
        isActive={!!newLevel}
      />
    </>
  );
};

export default JoinMeetingLevel;
