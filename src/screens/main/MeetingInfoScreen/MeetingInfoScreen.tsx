import React, { useCallback, useEffect } from 'react';

import Button from '@components/Button/Button';
import MeetingInfo from '@components/MeetingInfo/MeetingInfo';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { setNotificationAction } from '@store/app-notifications/actions';
import { leaveMeetingAction } from '@store/meetings/actions';
import {
  getLeaveMeetingPendingSelector,
  getMyMeetingByIdSelector,
} from '@store/meetings/selectors';
import { getProfileDataSelector } from '@store/profile/selectors';
import dayjs from 'dayjs';
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
  const pendingLeaveMeeting = useSelector(getLeaveMeetingPendingSelector);
  const leaveMeeting = useActionWithDeferred(leaveMeetingAction);
  const { t } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);

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
          setNotification({
            id: dayjs().unix(),
            type: TooltipType.INFO,
            text: t('meeting.leaveSuccess'),
          });
        })
        .catch(() => {
          setNotification({
            id: dayjs().unix(),
            type: TooltipType.ERROR,
            text: t('errors.leaveMeeting'),
          });
        });
    }
  }, [user, meeting, handleBack, leaveMeeting, setNotification, t]);

  const handleJoinMeeting = useCallback(() => {
    window.open(meeting?.googleMeetLink, '_blank');
  }, [meeting?.googleMeetLink]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return meeting ? (
    <div className={styles.container}>
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
        <Button
          onClick={handleJoinMeeting}
          containerClass={styles.joinButton}
          title={t('button.join')}
          disabled={pendingLeaveMeeting}
        />
        <Button
          onClick={handleLeaveMeeting}
          containerClass={styles.leaveButton}
          title={t('button.leave')}
          loading={pendingLeaveMeeting}
        />
      </div>
    </div>
  ) : (
    <div>no meeting</div>
  );
};

export default MeetingInfoScreen;
