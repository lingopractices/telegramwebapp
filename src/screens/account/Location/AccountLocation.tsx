import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CheckedRadio from '@components/CheckedRadio/CheckedRadio';
import SearchBox from '@components/SearchBox/SearchBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { ICoutnry, useCountries } from '@hooks/use-countries';
import useTgBackButton from '@hooks/useTgBackButton';
import { Skeleton } from '@mui/material';
import { setNotificationAction } from '@store/app-notifications/actions';
import { updateProfileAction } from '@store/profile/actions';
import { getProfileDataSelector, locationSelector } from '@store/profile/selectors';
import { createAndFillArray } from '@utils/create-fill-array';
import { getClearString } from '@utils/get-clear-string';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH } from 'routing/routing.constants';

import styles from './AccountLocation.module.scss';

const AccountLocation = () => {
  const { countries, isLoad } = useCountries();
  const [filteredCountries, setFilteredCountries] = useState<ICoutnry[]>(countries);
  const currentLocation = useSelector(locationSelector);
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);
  const user = useSelector(getProfileDataSelector);
  const { setBackButtonOnClick } = useTgBackButton(true);
  const updateLocation = useActionWithDeferred(updateProfileAction);
  const navigate = useNavigate();
  const setNotification = useActionWithDispatch(setNotificationAction);
  const { t } = useTranslation();

  useEffect(() => {
    if (countries) {
      setFilteredCountries(countries);
    }
  }, [countries]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFilteredCountries(
        countries.filter((country) => getClearString(country.name).includes(getClearString(value))),
      );
    },
    [countries, setFilteredCountries],
  );

  const handleChangeCountry = useCallback(
    (name: string) => {
      setSelectedLocation(name);
    },
    [setSelectedLocation],
  );

  const handleBack = useCallback(() => {
    navigate(ACCOUNT_PATH);
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    if (user && selectedLocation) {
      if (selectedLocation !== currentLocation) {
        updateLocation({
          ...user,
          userId: user.id,
          practiceLanguageId: user.practiceLanguage.id,
          interfaceLanguageId: user.interfaceLanguage.id,
          countryName: selectedLocation,
        })
          .then(() => {
            handleBack();
            setNotification({
              id: dayjs().unix(),
              type: TooltipType.SUCCESS,
              text: t('account.location.changed'),
            });
          })
          .catch(() => {
            setNotification({
              id: dayjs().unix(),
              type: TooltipType.ERROR,
              text: t('errors.location'),
            });
          });
      } else {
        handleBack();
      }
    }
  }, [user, selectedLocation, currentLocation, handleBack, setNotification, updateLocation, t]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  const mapCountriesToCheckBox = useCallback(
    (country: ICoutnry) => (
      <CheckedRadio
        key={country.id}
        label={country.name}
        id={country.id}
        radioGroupName='countries'
        isSelected={country.name === selectedLocation}
        onChange={handleChangeCountry}
      />
    ),
    [selectedLocation, handleChangeCountry],
  );

  const renderedCountries = useMemo(
    () => filteredCountries.map(mapCountriesToCheckBox),
    [filteredCountries, mapCountriesToCheckBox],
  );

  const renderCountrySkelet = useCallback(
    (value: number) => (
      <Skeleton key={value} className={styles.skeletContainer} animation='wave'>
        <CheckedRadio
          label=''
          id=''
          radioGroupName=''
          isSelected={false}
          onChange={handleChangeCountry}
        />
      </Skeleton>
    ),
    [handleChangeCountry],
  );

  const renderedCountiresSkelet = useMemo(
    () => createAndFillArray(20).map(renderCountrySkelet),
    [renderCountrySkelet],
  );

  return (
    <div className={classNames(styles.container, { [styles.pending]: isLoad })}>
      <div className={styles.stickyHeader}>
        <h2>{t('account.location.setLocation')}</h2>
        <SearchBox onChange={handleSearchChange} containerClassname={styles.searchContainer} />
      </div>
      <div className={styles.countriesWrapper}>
        {!isLoad ? renderedCountiresSkelet : renderedCountries}
      </div>
      <SubmitButton
        title={selectedLocation ? t('button.submit') : t('account.location.chooseContry')}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default AccountLocation;
