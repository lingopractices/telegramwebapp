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
  CREATE_LANGUAGES_PATH,
  CREATE_LEVELS_PATH,
  INSTANT_MAIN_PATH,
} from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

import styles from './CreateMeetingLanguage.module.scss';

const CreateMeetingLanguage: React.FC = () => {
  const location = useLocation();
  const currentLanguage = useSelector(getPracticeLanguageSelector);
  const languagesPending = useSelector(languagePendingSelector);
  const meetingData: CreateMeetingType = location?.state;
  const [newLanguage, setNewLanguage] = useState(
    meetingData?.language?.currentLanguage || currentLanguage,
  );
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
            path: CREATE_LANGUAGES_PATH,
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
    navigate(CREATE_LEVELS_PATH, { state: { ...locationData } });
  }, [locationData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={classNames(styles.container, { [styles.pending]: languagesPending })}>
      <StepBox meetingData={locationData} containerClass={styles.stepBoxContainer} />
      <LanguageList
        popularLanguagesIds={popularLanguagesIds}
        defaultLanguage={newLanguage}
        title={t('language.choosePracticeLang')}
        containerClass={styles.listClass}
        onChangeLanguage={setNewLanguage}
      />
      <SubmitButton
        onClick={handleForward}
        title={newLanguage ? t('button.continue') : t('language.choose')}
        isActive={!!newLanguage}
      />
    </div>
  );
};

export default CreateMeetingLanguage;
