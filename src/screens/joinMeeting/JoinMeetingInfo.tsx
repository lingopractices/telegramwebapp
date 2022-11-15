import React, { useCallback, useEffect, useState } from 'react';

import MeetingInfo from '@components/MeetingInfo/MeetingInfo';
import StaticNavigation from '@components/StaticNavigation/StaticNavigation';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { joinMeetingAction } from '@store/meetings/actions';
import { getMeetingByIdSelector } from '@store/meetings/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { IJoinMeetingResponse, JoinMeetingResult } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { INSTANT_MAIN_PATH, JOIN_MEETINGS_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

const JoinMeetingInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: meetingId } = useParams();
  const [meetingData, setMeetingData] = useState<JoinMeetingType>(location?.state?.meetingData);
  const meeting = useSelector(getMeetingByIdSelector(Number(meetingId)));
  const joinMeeting = useActionWithDeferred(joinMeetingAction);
  const { t } = useTranslation();

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, devButton } = useTgMainButton(
    true,
    true,
    t('button.submit').toUpperCase(),
  );

  const handleBack = useCallback(() => {
    navigate(JOIN_MEETINGS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    joinMeeting<IJoinMeetingResponse>({
      meetingId: Number(meetingId),
    })
      .then(({ result }) => {
        if (result === JoinMeetingResult.Success) {
          handleForward();
        }
      })
      .catch((e) => {});
  }, [meetingId, joinMeeting, handleForward]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  useEffect(() => {
    setMainButtonOnClick(handleSubmit);
  }, [handleSubmit, setMainButtonOnClick]);

  return meeting ? (
    <>
      <MeetingInfo
        id={meeting.id}
        meetingDate={meeting.meetingDate}
        topic={meeting.topic}
        participantsCount={meeting.participantsCount}
        maxParticipantsCount={meeting.maxParticipantsCount}
        userCreator={meeting.userCreator}
        googleMeetLink={meeting.googleMeetLink}
      />
      {import.meta.env.DEV && (
        <StaticNavigation
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          devButton={devButton}
        />
      )}
    </>
  ) : (
    <div>no meeting</div>
  );
};

export default JoinMeetingInfo;

// linkedIn junor react open to work след неделя
