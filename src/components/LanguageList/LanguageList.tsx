import React, { useCallback, useEffect, useMemo, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import SearchBox from '@components/SearchBox/SearchBox';

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
