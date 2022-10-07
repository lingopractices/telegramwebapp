import React, { useCallback, useEffect, useMemo, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import SearchBox from '@components/SearchBox/SearchBox';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ACCOUNT_INTERFACE_LANGUAGES_PATH,
  ACCOUNT_LANGUAGES_PATH,
  ACCOUNT_PATH,
  CREATE_LANGUAGES_PATH,
  CREATE_LEVELS_PATH,
  JOIN_LANGUAGES_PATH,
  JOIN_LEVELS_PATH,
  MAIN_PATH,
} from 'routing/routing.constants';

import styles from './LanguageList.module.scss';

const LanguageList = () => {
  const languages = useMemo(
    () => [
      { id: 0, label: 'English', popular: true },
      { id: 1, label: 'Spanish', popular: false },
      { id: 2, label: 'Belarussian', popular: true },
      { id: 2, label: 'Franch', popular: false },
    ],
    [],
  );
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [searchStringText, setSearchStringText] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(languages);
  const [forwardPath, setForwardPath] = useState('');

  const navigate = useNavigate();
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(
    true,
    false,
    'CHOOSE A LANGUAGE',
  );
  const location = useLocation();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleForward = useCallback(() => {
    navigate(forwardPath);
  }, [forwardPath, navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  useEffect(() => {
    switch (location.pathname) {
      case CREATE_LANGUAGES_PATH:
        setForwardPath(CREATE_LEVELS_PATH);
        break;
      case JOIN_LANGUAGES_PATH:
        setForwardPath(JOIN_LEVELS_PATH);
        break;
      case ACCOUNT_LANGUAGES_PATH:
        setForwardPath(ACCOUNT_PATH);
        break;
      case ACCOUNT_INTERFACE_LANGUAGES_PATH:
        setForwardPath(ACCOUNT_PATH);
        break;
      default:
        setForwardPath(MAIN_PATH);
        break;
    }
  }, [location.pathname, setForwardPath]);

  useEffect(() => {
    if (currentLanguage) {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    } else {
      setMainButtonParams({ text: 'CHOOSE A LANGUAGE', is_active: false });
    }
  }, [currentLanguage, setMainButtonParams]);

  const handleChangeLanguage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentLanguage(event.target.value);
    },
    [setCurrentLanguage],
  );

  const handleChangeSearchString = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchStringText(e.target.value);
    },
    [setSearchStringText],
  );

  useEffect(() => {
    if (currentLanguage) {
      setSearchStringText('');
    }
  }, [currentLanguage, setSearchStringText]);

  useEffect(() => {
    setFilteredLanguages(
      languages.filter((item) =>
        getClearString(item.label).includes(getClearString(searchStringText)),
      ),
    );
  }, [searchStringText, languages]);

  return (
    <div className={styles.container}>
      <h2>{'choose meeting language'.toUpperCase()}</h2>
      <SearchBox
        onChange={handleChangeSearchString}
        value={searchStringText}
        containerClassname={styles.search}
      />
      <h2>POPULAR</h2>
      <div className={styles.wrapper}>
        {filteredLanguages.map(
          (lang) =>
            lang.popular && (
              <RadioItem
                key={lang.id}
                radioGroupName='languages'
                label={lang.label}
                onChange={handleChangeLanguage}
                isSelected={lang.label === currentLanguage}
                paddingClass={styles.paddingContainer}
              />
            ),
        )}
      </div>
      <h2>OTHER</h2>
      <div className={styles.wrapper}>
        {filteredLanguages.map(
          (lang) =>
            !lang.popular && (
              <RadioItem
                key={lang.id}
                radioGroupName='languages'
                label={lang.label}
                onChange={handleChangeLanguage}
                isSelected={lang.label === currentLanguage}
                paddingClass={styles.paddingContainer}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default LanguageList;

function getClearString(string: string): string {
  return string.trim().toLowerCase();
}
