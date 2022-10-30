import React, { useCallback, useEffect, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import { getLanguageLevelSelector } from '@store/profile/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { LanguageLevel } from 'lingopractices-models';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_LANGUAGES_PATH, CREATE_TOPICS_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingLevel: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const currentLevel = useSelector(getLanguageLevelSelector);

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(true, false);

  const handleChangeLevel = useCallback(
    (languageLevel: LanguageLevel) => {
      setMeetingData((prev) => ({ ...prev, languageLevel }));
    },
    [setMeetingData],
  );

  useEffect(() => {
    if (!meetingData?.languageLevel && currentLevel) {
      handleChangeLevel(currentLevel);
    }
  }, [meetingData?.languageLevel, currentLevel, handleChangeLevel]);

  useEffect(() => {
    if (meetingData?.languageLevel) {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    } else {
      setMainButtonParams({ text: 'CHOOSE A LEVEL', is_active: false });
    }
  }, [meetingData?.languageLevel, setMainButtonParams]);

  const handleBack = useCallback(() => {
    navigate(CREATE_LANGUAGES_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_TOPICS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <LevelList
      onChangeLevel={handleChangeLevel}
      defaultLevelId={meetingData?.languageLevel || currentLevel}
    />
  );
};

export default CreateMeetingLevel;
