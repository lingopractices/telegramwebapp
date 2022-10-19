import React, { useCallback, useEffect, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import SearchBox from '@components/SearchBox/SearchBox';
import { ILanguage } from 'lingopractices-models';

import styles from './LanguageList.module.scss';

interface ILanguageList {
  dafaultLanguageId?: string;
  languages: ILanguage[];
  onChangeLanguage: (languageId: string) => void;
}

const LanguageList: React.FC<ILanguageList> = ({
  dafaultLanguageId,
  languages,
  onChangeLanguage,
}) => {
  const [currentLanguageId, setCurrentLanguageId] = useState(dafaultLanguageId || '');
  const [searchStringText, setSearchStringText] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(languages);

  useEffect(() => {
    onChangeLanguage(currentLanguageId);
  }, [currentLanguageId, onChangeLanguage]);

  const handleChangeLanguage = useCallback(
    (languageId: number | string) => {
      setCurrentLanguageId(String(languageId));
    },
    [setCurrentLanguageId],
  );

  const handleChangeSearchString = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchStringText(e.target.value);
    },
    [setSearchStringText],
  );

  useEffect(() => {
    if (currentLanguageId) {
      setSearchStringText('');
    }
  }, [currentLanguageId, setSearchStringText]);

  useEffect(() => {
    setFilteredLanguages(
      languages.filter((item) =>
        getClearString(item.name).includes(getClearString(searchStringText)),
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
            lang && (
              <RadioItem
                id={lang.id}
                key={lang.id}
                radioGroupName='languages'
                label={lang.name}
                onChange={handleChangeLanguage}
                isSelected={lang.id === currentLanguageId}
                containerClass={styles.paddingContainer}
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
