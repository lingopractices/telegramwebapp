import React, { useCallback, useEffect, useState } from 'react';

import LanguageList from '@components/LanguageList/LanguageList';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { languagePendingSelector, languagesSelector } from '@store/languages/selectors';
import { getPracticeLanguageSelector } from '@store/profile/selectors';
import { getTopicsAction } from '@store/topics/actions';
import { getTopicsSelector } from '@store/topics/selectors';
import { popularLanguagesIds } from 'common/constants';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_LEVELS_PATH, INSTANT_MAIN_PATH } from 'routing/routing.constants';
import { CreateMeetingType } from 'screens/types';

const CreateMeetingLanguage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentLanguage = useSelector(getPracticeLanguageSelector);
  const [meetingData, setMeetingData] = useState<CreateMeetingType>(location?.state?.meetingData);
  const languages = useSelector(languagesSelector);
  const topics = useSelector(getTopicsSelector);
  const getTopics = useActionWithDeferred(getTopicsAction);
  const languagesPending = useSelector(languagePendingSelector);
  const { t } = useTranslation();

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams, setLoadingMainButton } = useTgMainButton(
    true,
    false,
  );

  const handleChangeLanguage = useCallback(
    (languageId: string) => {
      setMeetingData((prev) => ({ ...prev, languageId }));
    },
    [setMeetingData],
  );

  useEffect(() => {
    if (!meetingData?.languageId && currentLanguage) {
      handleChangeLanguage(currentLanguage.id);
    }
  }, [meetingData?.languageId, currentLanguage, currentLanguage?.id, handleChangeLanguage]);

  useEffect(() => {
    if (meetingData?.languageId) {
      setMainButtonParams({ text: t('button.submit').toUpperCase(), is_active: true });
    } else {
      setMainButtonParams({ text: t('language.choose').toUpperCase(), is_active: false });
    }
  }, [meetingData?.languageId, setMainButtonParams, t]);

  const handleBack = useCallback(() => {
    navigate(INSTANT_MAIN_PATH);
  }, [navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_LEVELS_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  useEffect(() => {
    setLoadingMainButton(languagesPending);
  }, [languagesPending, setLoadingMainButton]);

  useEffect(() => {
    if (!topics.length) {
      getTopics();
    }
  }, [topics.length, getTopics]);

  return (
    <LanguageList
      popularLanguagesIds={popularLanguagesIds}
      languages={languages}
      onChangeLanguage={handleChangeLanguage}
      defaultLanguageId={meetingData?.languageId || currentLanguage?.id}
    />
  );
};

export default CreateMeetingLanguage;
