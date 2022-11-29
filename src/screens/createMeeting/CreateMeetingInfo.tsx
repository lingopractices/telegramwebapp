import React, { useCallback, useEffect, useState } from 'react';

import ResultInfo from '@components/ResultInfo/ResultInfo';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { createMeetingAction } from '@store/meetings/actions';
import { getCreateMeetingPendingSelector } from '@store/meetings/selectors';
import { setNotificationAction } from '@store/notifications/actions';
import { mergeDateAndTime } from '@utils/date-utils';
import dayjs from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { CreateMeetingResult } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_SUCCESS, CREATE_TIME_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const createPending = useSelector(getCreateMeetingPendingSelector);
  const createMeeting = useActionWithDeferred(createMeetingAction);
  const { t } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);

  const { setBackButtonOnClick } = useTgBackButton(true);

  const handleBack = useCallback(() => {
    navigate(CREATE_TIME_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_SUCCESS);
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    if (
      meetingData?.languageId &&
      meetingData?.languageLevel &&
      meetingData?.topicId &&
      meetingData?.peopleNumber &&
      meetingData?.meetingDate &&
      meetingData?.meetingTime
    ) {
      const meetingAt = mergeDateAndTime(meetingData.meetingDate, meetingData.meetingTime);

      if (meetingAt > dayjs()) {
        createMeeting({
          languageId: meetingData.languageId,
          languageLevel: meetingData.languageLevel,
          meetingAt: meetingAt.toJSON(),
          topicId: meetingData.topicId,
          peopleNumber: meetingData.peopleNumber,
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
  }, [
    meetingData?.languageLevel,
    meetingData?.peopleNumber,
    meetingData?.languageId,
    meetingData?.meetingDate,
    meetingData?.meetingTime,
    meetingData?.topicId,
    createMeeting,
    handleForward,
    setNotification,
    t,
  ]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <ResultInfo meetingData={meetingData} />
      <SubmitButton onClick={handleSubmit} title={t('button.submit')} loading={createPending} />
    </>
  );
};

export default CreateMeetingInfo;
