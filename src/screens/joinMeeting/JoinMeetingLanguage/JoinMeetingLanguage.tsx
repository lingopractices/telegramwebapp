import React, { useCallback, useEffect, useMemo, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { useBackSwipe } from '@hooks/use-swipe';
import { languagePendingSelector } from '@store/languages/selectors';
import { getPracticeLanguageSelector } from '@store/profile/selectors';
import classNames from 'classnames';
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
  const location = useLocation();
  const currentLanguage = useSelector(getPracticeLanguageSelector);
  const meetingData: JoinMeetingType = location?.state;
  const [newLanguage, setNewLanguage] = useState(
    meetingData?.language?.currentLanguage || currentLanguage,
  );
  const languagesPending = useSelector(languagePendingSelector);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setBackButtonOnClick } = useTgBackButton(true);

  const locationData = useMemo(() => {
    if (newLanguage) {
      return {
        ...meetingData,
        language: {
          currentLanguage: newLanguage,
          data: {
            path: JOIN_LANGUAGES_PATH,
            title: t('meetingInfo.practiceLang'),
            value: newLanguage.name,
          },
        },
      };
    }

    return meetingData;
  }, [meetingData, newLanguage, t]);

  const handleBack = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  useBackSwipe(handleBack);

  const handleForward = useCallback(() => {
    navigate(JOIN_LEVELS_PATH, { state: { ...locationData } });
  }, [locationData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={classNames(styles.container, { [styles.pending]: languagesPending })}>
      <StepBox meetingData={locationData} containerClass={styles.stepBoxContainer} />
      <LanguageList
        popularLanguagesIds={popularLanguagesIds}
        onChangeLanguage={setNewLanguage}
        defaultLanguage={newLanguage}
        title={t('language.choosePracticeLang')}
        containerClass={styles.listClass}
      />
      <SubmitButton
        onClick={handleForward}
        title={newLanguage ? t('button.submit') : t('language.choose')}
        isActive={!!newLanguage}
      />
    </div>
  );
};

export default JoinMeetingLanguage;
