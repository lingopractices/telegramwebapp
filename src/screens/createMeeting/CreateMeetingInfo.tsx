import React, { useCallback, useEffect, useState } from 'react';

import ResultInfo from '@components/ResultInfo/ResultInfo';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { createMeetingAction } from '@store/meetings/actions';
import { getProfileDataSelector } from '@store/profile/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_TIME_PATH, INSTANT_MAIN_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const user = useSelector(getProfileDataSelector);
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
      user &&
      meetingData?.languageId &&
      meetingData?.languageLevel &&
      meetingData?.topicId &&
      meetingData?.peopleNumber &&
      meetingData?.meetingAt
    ) {
      setLoadingMainButton(true);
      createMeeting({
        userCreatorId: user.id,
        languageId: meetingData.languageId,
        languageLevel: meetingData.languageLevel,
        meetingAt: meetingData.meetingAt.toJSON(),
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
    user,
    meetingData?.languageLevel,
    meetingData?.peopleNumber,
    meetingData?.languageId,
    meetingData?.meetingAt,
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
