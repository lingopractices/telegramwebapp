import React, { useCallback, useEffect, useState } from 'react';

import DatePicker from '@components/DatePicker/DatePicker';
import StaticNavigation from '@components/StaticNavigation/StaticNavigation';
import dayjs, { Dayjs } from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_PARTICIPANTS_PATH, CREATE_TIME_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingDate: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams, devButton } = useTgMainButton(true, false);

  const handleChangeDate = useCallback(
    (value: Dayjs | null) => {
      if (value) {
        setMeetingData((prev) => ({ ...prev, meetingDate: value }));
      }
    },
    [setMeetingData],
  );

  useEffect(() => {
    if (meetingData?.meetingDate) {
      handleChangeDate(meetingData?.meetingDate);
    } else {
      handleChangeDate(dayjs());
    }
  }, [meetingData?.meetingDate, handleChangeDate]);

  useEffect(() => {
    if (meetingData?.meetingDate) {
      setMainButtonParams({ text: t('button.submit').toUpperCase(), is_active: true });
    } else {
      setMainButtonParams({ text: t('date.choose').toUpperCase(), is_active: false });
    }
  }, [meetingData?.meetingDate, setMainButtonParams, t]);

  const handleBack = useCallback(() => {
    navigate(CREATE_PARTICIPANTS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_TIME_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <DatePicker defaultDate={meetingData?.meetingDate} onChangeDate={handleChangeDate} />
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

export default CreateMeetingDate;
