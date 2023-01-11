import React, { useCallback, useMemo } from 'react';

import { confettiOptions } from '@assets/animations/confetti/confettiOptions';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import useTgBackButton from '@hooks/useTgBackButton';
import { getInterfaceLanguageSelector, speechesByLocaleSelector } from '@store/profile/selectors';
import { getRandomArbitrary } from '@utils/get-random-arbitrary';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { INSTANT_MAIN_PATH } from 'routing/routing.constants';

import styles from './CreateMeetingSuccess.module.scss';

const CreateMeetingSuccess: React.FC = () => {
  const interfaceLanguage = useSelector(getInterfaceLanguageSelector);
  const speeches = useSelector(speechesByLocaleSelector(interfaceLanguage?.id));
  const navigate = useNavigate();
  const { t } = useTranslation();
  useTgBackButton(false);

  const randomSpeech = useMemo(
    () => (speeches ? speeches[getRandomArbitrary(0, speeches.length)] : ''),
    [speeches],
  );

  const handleForward = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  return (
    <>
      <div className={styles.container}>
        <h2>{t('createSuccess.congrats')}</h2>
        <p>{randomSpeech || t('createSuccess.youCreatedMeet')}</p>
        <div className={styles.lottieWrapper}>
          <Lottie options={confettiOptions} height={300} width={300} />
        </div>
      </div>
      <SubmitButton onClick={handleForward} title={t('createSuccess.submit')} />
    </>
  );
};

export default CreateMeetingSuccess;
