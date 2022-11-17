import React, { useCallback, useEffect, useMemo, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import SearchBox from '@components/SearchBox/SearchBox';
import { ILanguage } from 'lingopractices-models';
import { differenceBy, intersectionWith } from 'lodash';
import { useTranslation } from 'react-i18next';

import styles from './LanguageList.module.scss';

interface ILanguageList {
  defaultLanguageId?: string;
  popularLanguagesIds?: string[];
  languages: ILanguage[];
  onChangeLanguage: (languageId: string) => void;
}

const LanguageList: React.FC<ILanguageList> = ({
  defaultLanguageId,
  popularLanguagesIds,
  languages,
  onChangeLanguage,
}) => {
  const { t } = useTranslation();
  const [searchStringText, setSearchStringText] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(languages);

  const handleChangeLanguage = useCallback(
    (languageId: number | string) => {
      onChangeLanguage(String(languageId));
    },
    [onChangeLanguage],
  );

  const handleChangeSearchString = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchStringText(e.target.value);
    },
    [setSearchStringText],
  );

  useEffect(() => {
    if (defaultLanguageId) {
      setSearchStringText('');
    }
  }, [defaultLanguageId, setSearchStringText]);

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
        isSelected={language.id === defaultLanguageId}
        containerClass={styles.paddingContainer}
      />
    ),
    [defaultLanguageId, handleChangeLanguage],
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
        <>
          {!!popular.length && <h3>{t('language.popular')}</h3>}
          <div className={styles.wrapper}>{popular.map(renderLanguages)}</div>
          {!!others.length && <h3>{t('language.other')}</h3>}
          <div className={styles.wrapper}>{others.map(renderLanguages)}</div>
        </>
      );
    }
    return <div className={styles.wrapper}>{filteredLanguages.map(renderLanguages)}</div>;
  }, [popularLanguagesIds, filteredLanguages, renderLanguages, t]);

  return (
    <div className={styles.container}>
      <h2>
        {t(
          popularLanguagesIds?.length
            ? 'language.choosePracticeLang'
            : 'language.chooseInterfaceLang',
        ).toUpperCase()}
      </h2>
      {popularLanguagesIds && (
        <SearchBox
          onChange={handleChangeSearchString}
          value={searchStringText}
          containerClassname={styles.search}
        />
      )}
      {renderedLanguages}
    </div>
  );
};

export default LanguageList;

function getClearString(string: string): string {
  return string.trim().toLowerCase();
}
