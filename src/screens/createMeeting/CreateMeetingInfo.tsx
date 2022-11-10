import React, { useCallback, useEffect, useState } from 'react';

import ResultInfo from '@components/ResultInfo/ResultInfo';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { createMeetingAction } from '@store/meetings/actions';
import { mergeDateAndTime } from '@utils/dateUtils';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_TIME_PATH, INSTANT_MAIN_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const createMeeting = useActionWithDeferred(createMeetingAction);

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setLoadingMainButton } = useTgMainButton(true, true, 'SUBMIT');

  const handleBack = useCallback(() => {
    navigate(CREATE_TIME_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
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
      setLoadingMainButton(true);
      createMeeting({
        languageId: meetingData.languageId,
        languageLevel: meetingData.languageLevel,
        meetingAt: mergeDateAndTime(meetingData.meetingDate, meetingData.meetingTime).toJSON(),
        topicId: meetingData.topicId,
        peopleNumber: meetingData.peopleNumber,
      })
        .then(() => {
          setLoadingMainButton(false);
          handleForward();
        })
        .catch((e) => {
          setLoadingMainButton(false);
        });
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
    setLoadingMainButton,
  ]);

  useEffect(() => {
    setMainButtonOnClick(handleSubmit);
  }, [handleSubmit, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return <ResultInfo meetingData={meetingData} />;
};

export default CreateMeetingInfo;
