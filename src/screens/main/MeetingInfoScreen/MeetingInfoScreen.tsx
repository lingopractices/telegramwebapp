import React, { useCallback, useEffect } from 'react';

import Button from '@components/Button/Button';
import MeetingInfo from '@components/MeetingInfo/MeetingInfo';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { leaveMeetingAction } from '@store/meetings/actions';
import { getMyMeetingByIdSelector } from '@store/meetings/selectors';
import { getProfileDataSelector } from '@store/profile/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { INSTANT_MAIN_PATH } from 'routing/routing.constants';

import styles from './MeetingInfoScreen.module.scss';

const MeetingInfoScreen: React.FC = () => {
  const { setBackButtonOnClick } = useTgBackButton(true);
  const navigate = useNavigate();
  const { id: meetingId } = useParams();
  const user = useSelector(getProfileDataSelector);
  const meeting = useSelector(getMyMeetingByIdSelector(Number(meetingId)));
  const leaveMeeting = useActionWithDeferred(leaveMeetingAction);
  const { t } = useTranslation();

  const handleBack = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  const handleLeaveMeeting = useCallback(() => {
    if (user && meeting) {
      leaveMeeting({
        userId: user.id,
        meetingId: meeting.id,
      })
        .then(() => {
          handleBack();
        })
        .catch((e: any) => {});
    }
  }, [user, meeting, handleBack, leaveMeeting]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return meeting ? (
    <div>
      <MeetingInfo
        id={meeting.id}
        meetingDate={meeting.meetingDate}
        topic={meeting.topic}
        participantsCount={meeting.participantsCount}
        maxParticipantsCount={meeting.maxParticipantsCount}
        userCreator={meeting.userCreator}
        googleMeetLink={meeting.googleMeetLink}
      />
      <div className={styles.buttons}>
        <Button onClick={() => {}} title={t('button.join')} />
        <Button onClick={handleLeaveMeeting} title={t('button.leave')} />
      </div>
    </div>
  ) : (
    <div>no meeting</div>
  );
};

export default MeetingInfoScreen;
