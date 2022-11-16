import React, { useCallback, useEffect, useState } from 'react';

import DatePicker from '@components/DatePicker/DatePicker';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import dayjs, { Dayjs } from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_PARTICIPANTS_PATH, CREATE_TIME_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingDate: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const [meetingDate, setMeetingDate] = useState<Dayjs | null>(meetingData.meetingDate || dayjs());

  const { setBackButtonOnClick } = useTgBackButton(true);

  useEffect(() => {
    setMeetingData((prev) => ({ ...prev, meetingDate }));
  }, [meetingDate, setMeetingData]);

  const handleBack = useCallback(() => {
    navigate(CREATE_PARTICIPANTS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_TIME_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <DatePicker defaultDate={meetingDate} onChangeDate={setMeetingDate} />
      <SubmitButton
        onClick={handleForward}
        title={meetingDate ? t('button.submit') : t('date.choose')}
        isActive={!!meetingDate}
      />
    </>
  );
};

export default CreateMeetingDate;
