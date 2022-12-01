import React, { useCallback, useEffect, useState } from 'react';

import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import Time from '@components/Time/Time';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { createMeetingAction } from '@store/meetings/actions';
import { getCreateMeetingPendingSelector } from '@store/meetings/selectors';
import { setNotificationAction } from '@store/notifications/actions';
import { mergeDateAndTime } from '@utils/date-utils';
import { HOUR_MINUTE } from 'common/constants';
import dayjs, { Dayjs } from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { CreateMeetingResult } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_DATE_PATH, CREATE_SUCCESS, CREATE_TIME_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingTime: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const [meetingTime, setMeetingTime] = useState(meetingData?.time?.meetingTime);
  const createPending = useSelector(getCreateMeetingPendingSelector);
  const setNotification = useActionWithDispatch(setNotificationAction);
  const createMeeting = useActionWithDeferred(createMeetingAction);

  const { setBackButtonOnClick } = useTgBackButton(true);

  const handleChangeTime = useCallback(
    (time: Dayjs) => {
      setMeetingTime(time);
      setMeetingData((prev) => ({
        ...prev,
        time: {
          meetingTime: time,
          data: {
            path: CREATE_TIME_PATH,
            title: t('meetingInfo.time'),
            value: dayjs(time).format(HOUR_MINUTE),
          },
        },
      }));
    },
    [setMeetingTime, setMeetingData, t],
  );

  const handleBack = useCallback(() => {
    navigate(CREATE_DATE_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_SUCCESS, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleSubmit = useCallback(() => {
    const { language, level, topic, number, date, time } = meetingData;

    if (
      language?.languageId &&
      level?.languageLevel &&
      topic?.topicId &&
      number?.peopleNumber &&
      date?.meetingDate &&
      time?.meetingTime
    ) {
      const meetingAt = mergeDateAndTime(date.meetingDate, time.meetingTime);

      if (meetingAt > dayjs()) {
        createMeeting({
          languageId: language.languageId,
          languageLevel: level.languageLevel,
          meetingAt: meetingAt.toJSON(),
          topicId: topic.topicId,
          peopleNumber: number.peopleNumber,
        })
          .then(() => {
            handleForward();
          })
          .catch((e: CreateMeetingResult) => {
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
          });
      } else {
        setNotification({
          id: dayjs().unix(),
          type: TooltipType.INFO,
          text: t('meeting.expiredTime'),
        });
      }
    }
  }, [meetingData, createMeeting, handleForward, setNotification, t]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <StepBox meetingData={meetingData} />
      <Time
        defaultDate={meetingData?.date?.meetingDate}
        defaultTime={meetingTime}
        onChangeTime={handleChangeTime}
      />
      <SubmitButton
        onClick={handleSubmit}
        title={meetingTime ? t('button.submit') : t('time.choose')}
        isActive={!!meetingTime}
        loading={createPending}
      />
    </>
  );
};

export default CreateMeetingTime;
