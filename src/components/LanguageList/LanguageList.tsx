import React, { useCallback, useEffect, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import SearchBox from '@components/SearchBox/SearchBox';

const LanguageList = () => {
  const languages = ['English', 'Spanish', 'Belarussian'];
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
  }, [searchStringText]);

  return (
    <div>
      <h3>change language</h3>
      <SearchBox onChange={handleChangeSearchString} value={searchStringText} />
      {filteredLanguages.map((lang) => (
        <RadioItem key={lang} radioGroupName='languages' label={lang} onChange={handleChangeLanguage} isSelected={lang === currentLanguage} />
      ))}
    </div>
  );
};

export default LanguageList;

function getClearString(string: string): string {
  return string.trim().toLowerCase();
}
