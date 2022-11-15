import React, { useCallback, useEffect, useState } from 'react';

import StaticNavigation from '@components/StaticNavigation/StaticNavigation';
import Time from '@components/Time/Time';
import { Dayjs } from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_DATE_PATH, CREATE_INFO } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingTime: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams, devButton } = useTgMainButton(true, false);

  const handleChangeTime = useCallback(
    (value: Dayjs) => {
      setMeetingData((prev) => ({ ...prev, meetingTime: value }));
    },
    [setMeetingData],
  );

  useEffect(() => {
    if (meetingData?.meetingTime) {
      setMainButtonParams({ text: t('button.submit').toUpperCase(), is_active: true });
    } else {
      setMainButtonParams({ text: t('time.choose').toUpperCase(), is_active: false });
    }
  }, [meetingData?.meetingTime, setMainButtonParams, t]);

  const handleBack = useCallback(() => {
    navigate(CREATE_DATE_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_INFO, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <Time
        defaultDate={meetingData?.meetingDate}
        defaultTime={meetingData?.meetingTime}
        onChangeTime={handleChangeTime}
      />
      {import.meta.env.DEV && (
        <StaticNavigation
          handleBack={handleBack}
          handleSubmit={handleForward}
          devButton={devButton}
        />
      )}
    </>
  );
};

export default CreateMeetingTime;
