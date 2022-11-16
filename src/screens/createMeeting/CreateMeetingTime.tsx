import React, { useCallback, useEffect, useState } from 'react';

import SubmitButton from '@components/SubmitButton/SubmitButton';
import Time from '@components/Time/Time';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_DATE_PATH, CREATE_INFO } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingTime: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const [meetingTime, setMeetingTime] = useState(meetingData?.meetingTime);

  const { setBackButtonOnClick } = useTgBackButton(true);

  useEffect(() => {
    setMeetingData((prev) => ({ ...prev, meetingTime }));
  }, [meetingTime]);

  const handleBack = useCallback(() => {
    navigate(CREATE_DATE_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_INFO, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <Time
        defaultDate={meetingData?.meetingDate}
        defaultTime={meetingTime}
        onChangeTime={setMeetingTime}
      />
      <SubmitButton
        onClick={handleForward}
        title={meetingTime ? t('button.submit') : t('time.choose')}
        isActive={!!meetingTime}
      />
    </>
  );
};

export default CreateMeetingTime;
