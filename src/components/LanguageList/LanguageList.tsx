import React, { useCallback, useEffect, useMemo, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import SearchBox from '@components/SearchBox/SearchBox';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { Skeleton } from '@mui/material';
import { getLanguagesAction } from '@store/languages/actions';
import { languagePendingSelector, languagesSelector } from '@store/languages/selectors';
import { getClearString } from '@utils/get-clear-string';
import { ILanguage } from 'lingopractices-models';
import { differenceBy, intersectionWith, isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import styles from './LanguageList.module.scss';

interface ILanguageList {
  title?: string;
  defaultLanguageId?: string;
  popularLanguagesIds?: string[];
  languages?: ILanguage[];
  onChangeLanguage: (languageId: string) => void;
}

const LanguageList: React.FC<ILanguageList> = ({
  title,
  defaultLanguageId,
  popularLanguagesIds,
  languages,
  onChangeLanguage,
}) => {
  const { t } = useTranslation();
  const allLanguages = useSelector(languagesSelector);
  const languagesPending = useSelector(languagePendingSelector);
  const [filteredLanguages, setFilteredLanguages] = useState<ILanguage[]>(
    languages || allLanguages,
  );
  const getLanguages = useActionWithDispatch(getLanguagesAction);

  useEffect(() => {
    if (isEmpty(allLanguages)) {
      getLanguages();
    }

    if (!languages && isEmpty(filteredLanguages) && !isEmpty(allLanguages)) {
      setFilteredLanguages(allLanguages);
    }
  }, [languages, allLanguages, filteredLanguages, getLanguages]);

  const handleChangeLanguage = useCallback(
    (languageId: number | string) => {
      onChangeLanguage(String(languageId));
    },
    [onChangeLanguage],
  );

  const handleChangeSearchString = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setFilteredLanguages(
        allLanguages.filter((language) =>
          getClearString(language.name).includes(getClearString(value)),
        ),
      );
    },
    [allLanguages, setFilteredLanguages],
  );

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

  const renderSkeletLanguage = useCallback(
    (value: string) => (
      <Skeleton key={value} className={styles.paddingContainer} animation='wave'>
        <RadioItem
          id=''
          radioGroupName=''
          label=''
          onChange={handleChangeLanguage}
          isSelected={false}
        />
      </Skeleton>
    ),
    [handleChangeLanguage],
  );

  const renderedLanguages = useMemo(() => {
    if (popularLanguagesIds) {
      const popular = intersectionWith(
        filteredLanguages,
        popularLanguagesIds,
        (a, b) => a.id === b,
      );

      const others = differenceBy(filteredLanguages, popular, 'id');

      return languagesPending ? (
        <>
          <h3>
            <Skeleton className={styles.headerSkelet}>
              <p>{t('language.popular')}</p>
            </Skeleton>
          </h3>
          <div className={styles.wrapper}>{popularLanguagesIds.map(renderSkeletLanguage)}</div>
          <h3>
            <Skeleton className={styles.headerSkelet}>
              <p>{t('language.other')}</p>
            </Skeleton>
          </h3>
          <div className={styles.wrapper}>{popularLanguagesIds.map(renderSkeletLanguage)}</div>
        </>
      ) : (
        <>
          {!!popular.length && <h3>{t('language.popular')}</h3>}
          <div className={styles.wrapper}>{popular.map(renderLanguages)}</div>
          {!!others.length && <h3>{t('language.other')}</h3>}
          <div className={styles.wrapper}>{others.map(renderLanguages)}</div>
        </>
      );
    }

    return languagesPending ? (
      <div className={styles.wrapper}>
        {filteredLanguages.map((langauge) => langauge.id).map(renderSkeletLanguage)}
      </div>
    ) : (
      <div className={styles.wrapper}>{filteredLanguages.map(renderLanguages)}</div>
    );
  }, [
    popularLanguagesIds,
    languagesPending,
    filteredLanguages,
    renderLanguages,
    renderSkeletLanguage,
    t,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.stickyHeader}>
        <h2>{title}</h2>
        {popularLanguagesIds && <SearchBox onChange={handleChangeSearchString} />}
      </div>
      {renderedLanguages}
    </div>
  );
};

export default LanguageList;
