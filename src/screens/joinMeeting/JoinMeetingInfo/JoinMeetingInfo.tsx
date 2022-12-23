import React, { useCallback, useEffect } from 'react';

import MeetingInfo from '@components/MeetingInfo/MeetingInfo';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { useBackSwipe } from '@hooks/use-swipe';
import { setNotificationAction } from '@store/app-notifications/actions';
import { AxiosErros } from '@store/common/axios-errors';
import { cancelJoinMeetingAction, joinMeetingAction } from '@store/meetings/actions';
import { getMeetingByIdSelector, getMeetingJoinPendingSelector } from '@store/meetings/selectors';
import { AxiosError } from 'axios';
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
  const { id: meetingId } = useParams();
  const meetingData: JoinMeetingType = location?.state;
  const meeting = useSelector(getMeetingByIdSelector(Number(meetingId)));
  const pendingJoinMeeting = useSelector(getMeetingJoinPendingSelector);
  const joinMeeting = useActionWithDeferred(joinMeetingAction);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);

  const { setBackButtonOnClick } = useTgBackButton(true);
  const cancelJoinMeeting = useActionWithDispatch(cancelJoinMeetingAction);

  useEffect(
    () => () => {
      if (pendingJoinMeeting && meetingId) {
        cancelJoinMeeting(Number(meetingId));
      }
    },
    [pendingJoinMeeting, meetingId, cancelJoinMeeting],
  );

  const handleBack = useCallback(() => {
    navigate(JOIN_MEETINGS_PATH, { state: { ...meetingData } });
  }, [meetingData, navigate]);

  useBackSwipe(handleBack);

  const handleForward = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    joinMeeting<IJoinMeetingResponse>({
      meetingId: Number(meetingId),
    })
      .then(({ result }) => {
        switch (result) {
          case JoinMeetingResult.Success:
            handleForward();
            setNotification({
              id: dayjs().unix(),
              type: TooltipType.SUCCESS,
              text: t('meeting.joined'),
            });
            break;
          case JoinMeetingResult.HasMeetingSameTime:
            handleBack();
            setNotification({
              id: dayjs().unix(),
              type: TooltipType.INFO,
              text: t('errors.hasMeeting'),
            });
            break;
          case JoinMeetingResult.AllSeatsAreTaken:
            handleBack();
            setNotification({
              id: dayjs().unix(),
              type: TooltipType.INFO,
              text: t('meeting.notSeats'),
            });
            break;

          default:
            setNotification({
              id: dayjs().unix(),
              type: TooltipType.ERROR,
              text: t('errors.joinMeeting'),
            });
            break;
        }
      })
      .catch((e: AxiosError) => {
        if (e.code !== AxiosErros.Cancelled) {
          setNotification({
            id: dayjs().unix(),
            type: TooltipType.ERROR,
            text: t('errors.joinMeeting'),
          });
        }
      });
  }, [meetingId, joinMeeting, handleForward, handleBack, setNotification, t]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return meeting ? (
    <div className={styles.container}>
      <MeetingInfo meeting={meeting} />
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
