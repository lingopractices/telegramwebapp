import React, { useCallback, useEffect, useState } from 'react';

import MeetingInfo from '@components/MeetingInfo/MeetingInfo';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { setNotificationAction } from '@store/app-notifications/actions';
import { joinMeetingAction } from '@store/meetings/actions';
import { getMeetingByIdSelector, getMeetingJoinPendingSelector } from '@store/meetings/selectors';
import dayjs from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { IJoinMeetingResponse, JoinMeetingResult } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { INSTANT_MAIN_PATH, JOIN_MEETINGS_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

import styles from './JoinMeetingInfo.module.scss';

const JoinMeetingInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: meetingId } = useParams();
  const [meetingData, setMeetingData] = useState<JoinMeetingType>(location?.state?.meetingData);
  const meeting = useSelector(getMeetingByIdSelector(Number(meetingId)));
  const pendingJoinMeeting = useSelector(getMeetingJoinPendingSelector);
  const joinMeeting = useActionWithDeferred(joinMeetingAction);
  const { t } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);

  const { setBackButtonOnClick } = useTgBackButton(true);

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
          setNotification({
            id: dayjs().unix(),
            type: TooltipType.SUCCESS,
            text: t('meeting.joined'),
          });
        }
      })
      .catch((e) =>
        setNotification({
          id: dayjs().unix(),
          type: TooltipType.ERROR,
          text: t('errors.joinMeeting'),
        }),
      );
  }, [meetingId, joinMeeting, handleForward, setNotification, t]);

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
      <SubmitButton
        onClick={handleSubmit}
        title={t('button.submit')}
        loading={pendingJoinMeeting}
      />
    </div>
  ) : (
    <div>no meeting</div>
  );
};

export default JoinMeetingInfo;
