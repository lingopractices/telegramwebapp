import React, { useCallback, useEffect, useState } from 'react';

import ResultInfo from '@components/ResultInfo/ResultInfo';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { createMeetingAction } from '@store/meetings/actions';
import { getCreateMeetingPendingSelector } from '@store/meetings/selectors';
import { mergeDateAndTime } from '@utils/date-utils';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_SUCCESS, CREATE_TIME_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const createPending = useSelector(getCreateMeetingPendingSelector);
  const createMeeting = useActionWithDeferred(createMeetingAction);
  const { t } = useTranslation();

  const { setBackButtonOnClick } = useTgBackButton(true);

  const handleBack = useCallback(() => {
    navigate(CREATE_TIME_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_SUCCESS);
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    if (
      meetingData?.languageId &&
      meetingData?.languageLevel &&
      meetingData?.topicId &&
      meetingData?.peopleNumber &&
      meetingData?.meetingDate &&
      meetingData?.meetingTime
    ) {
      createMeeting({
        languageId: meetingData.languageId,
        languageLevel: meetingData.languageLevel,
        meetingAt: mergeDateAndTime(meetingData.meetingDate, meetingData.meetingTime).toJSON(),
        topicId: meetingData.topicId,
        peopleNumber: meetingData.peopleNumber,
      })
        .then(() => {
          handleForward();
        })
        .catch((e) => {});
    }
  }, [
    meetingData?.languageLevel,
    meetingData?.peopleNumber,
    meetingData?.languageId,
    meetingData?.meetingDate,
    meetingData?.meetingTime,
    meetingData?.topicId,
    createMeeting,
    handleForward,
  ]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <ResultInfo meetingData={meetingData} />
      <SubmitButton onClick={handleSubmit} title={t('button.submit')} loading={createPending} />
    </>
  );
};

export default CreateMeetingInfo;
