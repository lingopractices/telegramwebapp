import React, { useCallback, useEffect, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { getLanguageLevelSelector } from '@store/profile/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { JOIN_DATE_PATH, JOIN_LANGUAGES_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

const JoinMeetingLevel: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<JoinMeetingType>(location?.state?.meetingData);
  const currentLevel = useSelector(getLanguageLevelSelector);
  const [newLevel, setNewLevel] = useState(meetingData?.languageLevel || currentLevel);
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { t } = useTranslation();

  useEffect(() => {
    setMeetingData((prev) => ({ ...prev, languageLevel: newLevel }));
  }, [newLevel]);

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
