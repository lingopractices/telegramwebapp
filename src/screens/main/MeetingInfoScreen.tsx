import React, { useCallback, useEffect } from 'react';

import MeetingInfo from '@components/MeetingInfo/MeetingInfo';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useNavigate } from 'react-router-dom';
import { INSTANT_MAIN_PATH } from 'routing/routing.constants';

const MeetingInfoScreen: React.FC = () => {
  const navigate = useNavigate();

  const { setBackButtonOnClick } = useTgBackButton(true);
  useTgMainButton(false, false);

  const handleBack = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return <MeetingInfo withControls={!!true} />;
};

export default MeetingInfoScreen;
