import React, { useCallback, useEffect, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { LanguageLevel } from 'lingopractices-models';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_DATE_PATH, CREATE_LANGUAGES_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingLevel: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(
    true,
    false,
    'CHOOSE A LEVEL',
  );

  const handleChangeLevel = useCallback(
    (languageLevel: LanguageLevel) => {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
      setMeetingData((prev) => ({ ...prev, languageLevel }));
    },
    [setMainButtonParams, setMeetingData],
  );

  const handleBack = useCallback(() => {
    navigate(CREATE_LANGUAGES_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_DATE_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <LevelList onChangeLevel={handleChangeLevel} dafaultLevelId={meetingData?.languageLevel} />
  );
};

export default CreateMeetingLevel;
