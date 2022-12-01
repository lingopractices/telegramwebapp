import React, { useCallback, useEffect, useState } from 'react';

import ParticipantsCount from '@components/ParticipantsCount/ParticipantsCount';
import StepBox from '@components/StepBox/StepBox';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CREATE_DATE_PATH,
  CREATE_PARTICIPANTS_PATH,
  CREATE_TOPICS_PATH,
} from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingParticipants: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const [peopleNumber, setPeopleNumber] = useState(meetingData?.number?.peopleNumber);

  const { setBackButtonOnClick } = useTgBackButton(true);

  const handleChangePeople = useCallback(
    (count: number) => {
      setPeopleNumber(count);
      navigate(CREATE_DATE_PATH, {
        state: {
          meetingData: {
            ...meetingData,
            number: {
              peopleNumber: count,
              data: {
                path: CREATE_PARTICIPANTS_PATH,
                title: t('meetingInfo.participants'),
                value: `${count}`,
              },
            },
          },
        },
      });
    },
    [setPeopleNumber, meetingData, navigate, t],
  );

  useEffect(() => {
    setMeetingData((prev) => {
      if (peopleNumber) {
        return {
          ...prev,
          number: {
            peopleNumber,
            data: {
              path: CREATE_PARTICIPANTS_PATH,
              title: t('meetingInfo.participants'),
              value: `${peopleNumber}`,
            },
          },
        };
      }

      return prev;
    });
  }, [peopleNumber, setMeetingData, t]);

  const handleBack = useCallback(() => {
    navigate(CREATE_TOPICS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <>
      <StepBox meetingData={meetingData} />
      <ParticipantsCount
        onChangeParticipiants={handleChangePeople}
        defaultParticipiants={peopleNumber}
      />
    </>
  );
};

export default CreateMeetingParticipants;
