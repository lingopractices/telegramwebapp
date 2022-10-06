import React, { useCallback, useEffect, useMemo, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import SearchBox from '@components/SearchBox/SearchBox';

import styles from './LanguageList.module.scss';

const LanguageList = () => {
  const languages = useMemo(() => ['English', 'Spanish', 'Belarussian'], []);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [searchStringText, setSearchStringText] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(languages);

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
    setFilteredLanguages(languages.filter((item) => getClearString(item).includes(getClearString(searchStringText))));
  }, [searchStringText, languages]);

  return (
    <div className={styles.container}>
      <h2>{'choose meeting language'.toUpperCase()}</h2>
      <SearchBox onChange={handleChangeSearchString} value={searchStringText} containerClassname={styles.search} />
      <div className={styles.wrapper}>
        {filteredLanguages.map((lang) => (
          <RadioItem key={lang} radioGroupName='languages' label={lang} onChange={handleChangeLanguage} isSelected={lang === currentLanguage} />
        ))}
      </div>
    </div>
  );
};

export default LanguageList;

function getClearString(string: string): string {
  return string.trim().toLowerCase();
}
