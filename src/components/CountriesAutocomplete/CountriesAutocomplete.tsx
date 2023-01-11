import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { ReactComponent as CloseIcon } from '@assets/icons/close.svg';
import { ReactComponent as LocationIcon } from '@assets/icons/location.svg';
import Button from '@components/Button/Button';
import { TooltipType } from '@components/Tooltip/Tooltip';
import AnimatedLogo, { LogoSize } from '@components/animatedLogo/AnimatedLogo';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { Skeleton } from '@mui/material';
import { setNotificationAction } from '@store/app-notifications/actions';
import { getCurrentLocationAction, getTimeZoneAction } from '@store/profile/actions';
import { GetLocationResponseType } from '@store/profile/features/get-current-location/types';
import { pendingUpdateUserSelector } from '@store/profile/selectors';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import LocationItem from './LocationItem/LocationItem';

import styles from './CountriesAutocomplete.module.scss';

interface ICountriesAutocompleteProps {
  defaultCity?: string;
  defaultCountry?: string;
  onChangeLocation: (locationData: GetLocationResponseType) => void;
}

const CountriesAutocomplete: React.FC<ICountriesAutocompleteProps> = ({
  onChangeLocation,
  defaultCity,
  defaultCountry,
}) => {
  const getTimeZone = useActionWithDeferred(getTimeZoneAction);
  const setNotification = useActionWithDispatch(setNotificationAction);
  const [fetchingIp, setFetchingIp] = useState(false);
  const [fetchingLocationData, setFetchingLocationData] = useState(false);
  const { t } = useTranslation();
  const [filteredPlaces, setFilteredPlaces] = useState<google.maps.places.AutocompletePrediction[]>(
    [],
  );
  const pendingUpdateLocation = useSelector(pendingUpdateUserSelector);
  const getCurrentLocation = useActionWithDeferred(getCurrentLocationAction);

  const {
    ready,
    value,
    suggestions: { status, data, loading: loadingCountries },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    setFilteredPlaces(
      data.filter(
        (suggestion) => suggestion.types[0] === 'locality' || suggestion.types[0] === 'county',
      ),
    );
  }, [data, setFilteredPlaces]);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  const handleClearInput = useCallback(() => {
    setValue('', false);
    clearSuggestions();
  }, [setValue, clearSuggestions]);

  const handleSelect = useCallback(
    (place: google.maps.places.AutocompletePrediction) => {
      setValue(place.description, false);
      clearSuggestions();

      setFetchingLocationData(true);
      getGeocode({ address: place.description })
        .then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          const formattedStringAddress = results[0].formatted_address.split(',');

          const city = formattedStringAddress[0].trim();
          const countryName = formattedStringAddress[formattedStringAddress.length - 1].trim();

          getTimeZone({ lat, lng })
            .then((timeZoneId?: string) => {
              if (timeZoneId) {
                onChangeLocation({ timeZoneId, city, countryName });
              }
            })
            .catch((e) => {
              setNotification({
                id: dayjs().unix(),
                type: TooltipType.ERROR,
                text: t('errors.loadLocation'),
              });
            })
            .finally(() => {
              setFetchingLocationData(false);
            });
        })
        .catch((e) => {
          setFetchingLocationData(false);
          setNotification({
            id: dayjs().unix(),
            type: TooltipType.ERROR,
            text: t('errors.loadLocation'),
          });
        });
    },
    [setValue, clearSuggestions, getTimeZone, onChangeLocation, setNotification, t],
  );

  const useCurrentLocation = useCallback(() => {
    setValue('');
    setFetchingIp(true);
    getCurrentLocation()
      .then((locationData?: GetLocationResponseType) => {
        if (locationData) {
          setValue(`${locationData.city}, ${locationData.countryName}`);
        }
      })
      .catch((e) => {
        setNotification({
          id: dayjs().unix(),
          type: TooltipType.ERROR,
          text: t('errors.useCurrent'),
        });
      })
      .finally(() => {
        setFetchingIp(false);
      });
  }, [getCurrentLocation, setFetchingIp, setValue, setNotification, t]);

  return (
    <div className={styles.container}>
      {ready ? (
        <div className={classNames(styles.inputWrapper, { [styles.active]: value.length })}>
          <input
            disabled={fetchingIp}
            className={styles.input}
            value={value}
            type='text'
            onChange={handleInput}
            placeholder={
              defaultCity && defaultCountry
                ? `${defaultCity}, ${defaultCountry}`
                : t('account.location.placeholder')
            }
          />

          {fetchingLocationData || loadingCountries || pendingUpdateLocation ? (
            <AnimatedLogo size={LogoSize.SMALL} />
          ) : (
            value && <CloseIcon onClick={handleClearInput} />
          )}
        </div>
      ) : (
        <Skeleton animation='wave' className={styles.skeletWrapper} />
      )}
      {!!filteredPlaces.length && (
        <ul className={styles.suggestions}>
          {status === 'OK' &&
            filteredPlaces.map((suggestion) => (
              <LocationItem place={suggestion} onSelect={handleSelect} key={suggestion.place_id} />
            ))}
        </ul>
      )}

      {!ready && <Skeleton animation='wave' className={styles.skeletUseCurrent} />}

      {!value && !filteredPlaces.length && ready && (
        <Button
          onClick={useCurrentLocation}
          containerClass={styles.currentLocation}
          loading={fetchingIp}
        >
          <span className={styles.childrenContainer}>
            <LocationIcon />
            {t('account.location.useCurrent')}
          </span>
        </Button>
      )}
    </div>
  );
};

export default CountriesAutocomplete;
