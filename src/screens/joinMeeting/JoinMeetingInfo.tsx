import React, { useCallback, useEffect, useState } from 'react';

import MeetingInfo from '@components/MeetingInfo/MeetingInfo';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { joinMeetingAction } from '@store/meetings/actions';
import { getMeetingByIdSelector, getMeetingJoinPendingSelector } from '@store/meetings/selectors';
import { getProfileDataSelector } from '@store/profile/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { INSTANT_MAIN_PATH, JOIN_MEETINGS_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

const JoinMeetingInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: meetingId } = useParams();
  const [meetingData, setMeetingData] = useState<JoinMeetingType>(location?.state?.meetingData);
  const user = useSelector(getProfileDataSelector);
  const pendingJoinMeeting = useSelector(getMeetingJoinPendingSelector);
  const meeting = useSelector(getMeetingByIdSelector(Number(meetingId)));
  const joinMeeting = useActionWithDeferred(joinMeetingAction);

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setLoadingMainButton } = useTgMainButton(true, true, 'SUBMIT');

  const handleBack = useCallback(() => {
    navigate(JOIN_MEETINGS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    if (user) {
      joinMeeting({
        meetingId: Number(meetingId),
        userId: user.id,
      })
        .then(() => {
          handleForward();
        })
        .catch((e) => {});
    }
  }, [user, meetingId, joinMeeting, handleForward]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  useEffect(() => {
    setMainButtonOnClick(handleSubmit);
  }, [handleSubmit, setMainButtonOnClick]);

  useEffect(() => {
    setLoadingMainButton(pendingJoinMeeting);
  }, [pendingJoinMeeting, setLoadingMainButton]);

  return meeting ? (
    <MeetingInfo
      id={meeting.id}
      meetingDate={meeting.meetingDate}
      topic={meeting.topic}
      participantsCount={meeting.participantsCount}
      maxParticipantsCount={meeting.maxParticipantsCount}
      userCreator={meeting.userCreator}
      googleMeetLink={meeting.googleMeetLink}
    />
  ) : (
    <div>no meeting</div>
  );
};

export default JoinMeetingInfo;
