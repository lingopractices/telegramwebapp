import React, { useCallback, useEffect, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { INSTANT_MAIN_PATH, JOIN_LEVELS_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

const JoinMeetingLanguage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<JoinMeetingType>(location?.state?.meetingData);

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(
    true,
    false,
    'CHOOSE A LANGUAGE',
  );

  const handleChangeLanguage = useCallback(
    (languageId: string) => {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
      setMeetingData((prev) => ({ ...prev, languageId }));
    },
    [setMainButtonParams, setMeetingData],
  );

  const handleBack = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  const handleForward = useCallback(() => {
    navigate(JOIN_LEVELS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <LanguageList
      onChangeLanguage={handleChangeLanguage}
      dafaultLanguageId={meetingData?.languageId}
    />
  );
};

export default JoinMeetingLanguage;
