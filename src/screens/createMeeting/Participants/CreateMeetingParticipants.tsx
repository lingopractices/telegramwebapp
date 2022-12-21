import React, { useCallback, useEffect } from 'react';

import ParticipantsCount from '@components/ParticipantsCount/ParticipantsCount';
import StepBox from '@components/StepBox/StepBox';
import { useBackSwipe } from '@hooks/use-swipe';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CREATE_DATE_PATH,
  CREATE_PARTICIPANTS_PATH,
  CREATE_TOPICS_PATH,
} from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

import styles from './CreateMeetingParticipants.module.scss';

const CreateMeetingParticipants: React.FC = () => {
  const location = useLocation();
  const meetingData: CreateMeetingType = location?.state;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setBackButtonOnClick } = useTgBackButton(true);

  const handleChangePeople = useCallback(
    (count: number) => {
      navigate(CREATE_DATE_PATH, {
        state: {
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
      });
    },
    [meetingData, navigate, t],
  );

  const handleBack = useCallback(() => {
    navigate(CREATE_TOPICS_PATH, { state: { ...meetingData } });
  }, [meetingData, navigate]);

  useBackSwipe(handleBack);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <StepBox meetingData={meetingData} containerClass={styles.stepBoxContainer} />
      <ParticipantsCount
        onChangeParticipiants={handleChangePeople}
        defaultParticipiants={meetingData.number?.peopleNumber}
      />
    </div>
  );
};

export default CreateMeetingParticipants;
