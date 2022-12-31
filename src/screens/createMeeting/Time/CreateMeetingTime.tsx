import React, { useCallback, useEffect, useMemo, useState } from 'react';

import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import Time from '@components/Time/Time';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { useBackSwipe } from '@hooks/use-swipe';
import { setNotificationAction } from '@store/app-notifications/actions';
import { AxiosErros } from '@store/common/axios-errors';
import { cancelCreateMeetingAction, createMeetingAction } from '@store/meetings/actions';
import { getCreateMeetingPendingSelector } from '@store/meetings/selectors';
import { mergeDateAndTime } from '@utils/date-utils';
import { AxiosError } from 'axios';
import { HOUR_MINUTE } from 'common/constants';
import dayjs from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { CreateMeetingResult } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_DATE_PATH, CREATE_SUCCESS, CREATE_TIME_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

import styles from './CreateMeetingTime.module.scss';

const CreateMeetingTime: React.FC = () => {
  const location = useLocation();
  const meetingData: CreateMeetingType = location?.state;
  const [meetingTime, setMeetingTime] = useState(meetingData?.time?.meetingTime);
  const createPending = useSelector(getCreateMeetingPendingSelector);
  const setNotification = useActionWithDispatch(setNotificationAction);
  const createMeeting = useActionWithDeferred(createMeetingAction);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setBackButtonOnClick } = useTgBackButton(true);

  const cancelCreateMeeting = useActionWithDispatch(cancelCreateMeetingAction);

  useEffect(
    () => () => {
      if (createPending) {
        cancelCreateMeeting();
      }
    },
    [createPending, cancelCreateMeeting],
  );

  const locationData = useMemo(() => {
    if (meetingTime) {
      return {
        ...meetingData,
        time: {
          meetingTime,
          data: {
            path: CREATE_TIME_PATH,
            title: t('meetingInfo.time'),
            value: dayjs(meetingTime).format(HOUR_MINUTE),
          },
        },
      };
    }

    return meetingData;
  }, [meetingData, meetingTime, t]);

  const handleBack = useCallback(() => {
    navigate(CREATE_DATE_PATH, { state: { ...locationData } });
  }, [locationData, navigate]);

  useBackSwipe(handleBack);

  const handleForward = useCallback(() => {
    navigate(CREATE_SUCCESS, { state: { ...locationData } });
  }, [locationData, navigate]);

  const handleSubmit = useCallback(() => {
    const { language, level, topic, number, date } = meetingData;

    if (
      language?.currentLanguage &&
      level?.languageLevel &&
      topic?.currentTopic &&
      number?.peopleNumber &&
      date?.meetingDate &&
      meetingTime
    ) {
      const meetingAt = mergeDateAndTime(date.meetingDate, meetingTime);

      if (meetingAt > dayjs()) {
        createMeeting({
          languageId: language.currentLanguage.id,
          languageLevel: level.languageLevel,
          meetingAt: meetingAt.toJSON(),
          topicId: topic.currentTopic.id,
          peopleNumber: number.peopleNumber,
        })
          .then(() => {
            handleForward();
          })
          .catch((e: CreateMeetingResult & AxiosError) => {
            if (e.code !== AxiosErros.Cancelled) {
              let textError: string;
              switch (e) {
                case CreateMeetingResult.HasMeetingSameTime:
                  textError = t('errors.hasMeeting');
                  break;
                default:
                  textError = t('errors.otherCreateMeeting');
                  break;
              }

              setNotification({ id: dayjs().unix(), type: TooltipType.ERROR, text: textError });
            }
          });
      } else {
        setNotification({
          id: dayjs().unix(),
          type: TooltipType.INFO,
          text: t('meeting.expiredTime'),
        });
      }
    }
  }, [meetingData, meetingTime, createMeeting, handleForward, setNotification, t]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <StepBox meetingData={locationData} containerClass={styles.stepBoxContainer} />
      <Time
        defaultDate={meetingData?.date?.meetingDate}
        defaultTime={meetingTime}
        onChangeTime={setMeetingTime}
      />
      <SubmitButton
        onClick={handleSubmit}
        title={meetingTime ? t('button.continue') : t('time.choose')}
        isActive={!!meetingTime}
        loading={createPending}
      />
    </div>
  );
};

export default CreateMeetingTime;
