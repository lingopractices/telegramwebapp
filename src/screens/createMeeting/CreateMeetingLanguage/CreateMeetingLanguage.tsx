import React, { useCallback, useEffect, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { languagePendingSelector, languagesSelector } from '@store/languages/selectors';
import { getPracticeLanguageSelector } from '@store/profile/selectors';
import { getTopicsAction } from '@store/topics/actions';
import { getTopicsSelector } from '@store/topics/selectors';
import { getLanguageById } from '@utils/get-language-topic-by-id';
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
  const navigate = useNavigate();
  const currentLanguage = useSelector(getPracticeLanguageSelector);
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const [newLanguageId, setNewLanguage] = useState(
    meetingData?.language?.languageId || currentLanguage?.id,
  );
  const languages = useSelector(languagesSelector);
  const topics = useSelector(getTopicsSelector);
  const getTopics = useActionWithDeferred(getTopicsAction);
  const languagesPending = useSelector(languagePendingSelector);
  const { t } = useTranslation();

  const { setBackButtonOnClick } = useTgBackButton(true);

  useEffect(() => {
    if (newLanguageId) {
      setMeetingData((prev) => ({
        ...prev,
        language: {
          languageId: newLanguageId,
          data: {
            path: CREATE_LANGUAGES_PATH,
            title: t('meetingInfo.practiceLang'),
            value: getLanguageById(languages, newLanguageId)?.name,
          },
        },
      }));
    }
  }, [newLanguageId, languages, setMeetingData, t]);

  const handleBack = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_LEVELS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  useEffect(() => {
    if (!topics.length) {
      getTopics();
    }
  }, [topics.length, getTopics]);

  return (
    <div className={styles.container}>
      <StepBox meetingData={meetingData} containerClass={styles.stepBoxContainer} />
      <LanguageList
        popularLanguagesIds={popularLanguagesIds}
        languages={languages}
        onChangeLanguage={setNewLanguage}
        defaultLanguageId={newLanguageId}
      />
      <SubmitButton
        onClick={handleForward}
        title={newLanguageId ? t('button.submit') : t('language.choose')}
        isActive={!!newLanguageId}
        loading={languagesPending}
      />
    </div>
  );
};

export default CreateMeetingLanguage;
