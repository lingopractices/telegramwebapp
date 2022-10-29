import React, { useCallback, useEffect } from 'react';

import MeetingInfo from '@components/MeetingInfo/MeetingInfo';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { leaveMeetingAction } from '@store/meetings/actions';
import {
  getMyMeetingByIdSelector,
  getLeaveMeetingPendingSelector,
} from '@store/meetings/selectors';
import { getProfileDataSelector } from '@store/profile/selectors';
import classNames from 'classnames';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { INSTANT_MAIN_PATH } from 'routing/routing.constants';

import styles from './MeetingInfoScreen.module.scss';

const MeetingInfoScreen: React.FC = () => {
  const { setBackButtonOnClick } = useTgBackButton(true);
  useTgMainButton(false, false);
  const navigate = useNavigate();
  const { id: meetingId } = useParams();
  const user = useSelector(getProfileDataSelector);
  const meeting = useSelector(getMyMeetingByIdSelector(Number(meetingId)));
  const leaveMeeting = useActionWithDeferred(leaveMeetingAction);
  const leavePending = useSelector(getLeaveMeetingPendingSelector);

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
        <button className={classNames(styles.join, styles.button)} type='button'>
          {'join meeting'.toUpperCase()}
        </button>
        <button
          onClick={handleLeaveMeeting}
          className={classNames(styles.leave, styles.button)}
          type='button'
        >
          {'leave meeting'.toUpperCase()}
        </button>
      </div>
    </div>
  ) : (
    <div>no meeting</div>
  );
};

export default MeetingInfoScreen;
