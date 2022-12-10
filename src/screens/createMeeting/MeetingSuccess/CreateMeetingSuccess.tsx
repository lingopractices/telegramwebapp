import React, { useCallback } from 'react';

import { confettiOptions } from '@assets/animations/confetti/confettiOptions';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import useTgBackButton from '@hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import { INSTANT_MAIN_PATH } from 'routing/routing.constants';

import styles from './CreateMeetingSuccess.module.scss';

const CreateMeetingSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  useTgBackButton(false);

  const handleForward = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  return (
    <>
      <div className={styles.container}>
        <h2>{t('createSuccess.congrats')}</h2>
        <p>{t('createSuccess.youCreatedMeet')}</p>
        <div className={styles.lottieWrapper}>
          <Lottie options={confettiOptions} height={300} width={300} />
        </div>
      </div>
      <SubmitButton onClick={handleForward} title={t('createSuccess.submit')} />
    </>
  );
};

export default CreateMeetingSuccess;
