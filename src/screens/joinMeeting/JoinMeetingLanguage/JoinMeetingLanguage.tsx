import React, { useCallback, useEffect, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { languagePendingSelector, languagesSelector } from '@store/languages/selectors';
import { getPracticeLanguageSelector } from '@store/profile/selectors';
import { getLanguageById } from '@utils/get-language-topic-by-id';
import { popularLanguagesIds } from 'common/constants';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  INSTANT_MAIN_PATH,
  JOIN_LANGUAGES_PATH,
  JOIN_LEVELS_PATH,
} from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

import styles from './JoinMeetingLanguage.module.scss';

const JoinMeetingLanguage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLanguage = useSelector(getPracticeLanguageSelector);
  const [meetingData, setMeetingData] = useState<JoinMeetingType>(location?.state?.meetingData);
  const [newLaungageId, setNewLanguage] = useState(
    meetingData?.language?.languageId || currentLanguage?.id,
  );
  const languages = useSelector(languagesSelector);
  const languagesPending = useSelector(languagePendingSelector);
  const { t } = useTranslation();

  const { setBackButtonOnClick } = useTgBackButton(true);

  useEffect(() => {
    if (newLaungageId) {
      setMeetingData((prev) => ({
        ...prev,
        language: {
          languageId: newLaungageId,
          data: {
            path: JOIN_LANGUAGES_PATH,
            title: t('meetingInfo.practiceLang'),
            value: getLanguageById(languages, newLaungageId)?.name,
          },
        },
      }));
    }
  }, [newLaungageId, languages, setMeetingData, t]);

  const handleBack = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  const handleForward = useCallback(() => {
    navigate(JOIN_LEVELS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <StepBox meetingData={meetingData} containerClass={styles.stepBoxContainer} />
      <LanguageList
        popularLanguagesIds={popularLanguagesIds}
        languages={languages}
        onChangeLanguage={setNewLanguage}
        defaultLanguageId={newLaungageId}
        title={t('language.choosePracticeLang')}
      />
      <SubmitButton
        onClick={handleForward}
        title={newLaungageId ? t('button.submit') : t('language.choose')}
        isActive={!!newLaungageId}
      />
    </div>
  );
};

export default JoinMeetingLanguage;