import React, { useCallback, useEffect, useMemo, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import SearchBox from '@components/SearchBox/SearchBox';
import { ILanguage } from 'lingopractices-models';
import { differenceBy, intersectionWith } from 'lodash';

import styles from './LanguageList.module.scss';

interface ILanguageList {
  dafaultLanguageId?: string;
  popularLanguagesIds?: string[];
  languages: ILanguage[];
  onChangeLanguage: (languageId: string) => void;
}

const LanguageList: React.FC<ILanguageList> = ({
  dafaultLanguageId,
  popularLanguagesIds,
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

  const renderLanguages = useCallback(
    (language: ILanguage) => (
      <RadioItem
        id={language.id}
        key={language.id}
        radioGroupName='languages'
        label={language.name}
        onChange={handleChangeLanguage}
        isSelected={language.id === currentLanguageId}
        containerClass={styles.paddingContainer}
      />
    ),
    [currentLanguageId, handleChangeLanguage],
  );

  const renderedLanguages = useMemo(() => {
    if (popularLanguagesIds) {
      const popular = intersectionWith(
        filteredLanguages,
        popularLanguagesIds,
        (a, b) => a.id === b,
      );
      const others = differenceBy(filteredLanguages, popular, 'id');

      return (
        <div>
          <SearchBox
            onChange={handleChangeSearchString}
            value={searchStringText}
            containerClassname={styles.search}
          />
          {!!popular.length && <h2>Popular</h2>}
          <div className={styles.wrapper}>{popular.map(renderLanguages)}</div>
          {!!others.length && <h2>Other</h2>}
          <div className={styles.wrapper}>{others.map(renderLanguages)}</div>
        </div>
      );
    }
    return <div className={styles.wrapper}>{filteredLanguages.map(renderLanguages)}</div>;
  }, [
    popularLanguagesIds,
    filteredLanguages,
    searchStringText,
    renderLanguages,
    handleChangeSearchString,
  ]);

  return (
    <div className={styles.container}>
      <h2>{'choose meeting language'.toUpperCase()}</h2>
      {renderedLanguages}
    </div>
  );
};

export default LanguageList;

function getClearString(string: string): string {
  return string.trim().toLowerCase();
}
