import React, { useCallback, useEffect } from 'react';

import CountriesAutocomplete from '@components/CountriesAutocomplete/CountriesAutocomplete';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { useBackSwipe } from '@hooks/use-swipe';
import useTgBackButton from '@hooks/useTgBackButton';
import { setNotificationAction } from '@store/app-notifications/actions';
import { AxiosErros } from '@store/common/axios-errors';
import { cancelUpdateProfileAction, updateProfileAction } from '@store/profile/actions';
import { GetLocationResponseType } from '@store/profile/features/get-current-location/types';
import { getProfileDataSelector, pendingUpdateUserSelector } from '@store/profile/selectors';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH } from 'routing/routing.constants';

import styles from './AccountLocation.module.scss';

const AccountLocation = () => {
  const user = useSelector(getProfileDataSelector);
  const pendingUpdateProfile = useSelector(pendingUpdateUserSelector);
  const { setBackButtonOnClick } = useTgBackButton(true);
  const { t } = useTranslation();
  const updateLocation = useActionWithDeferred(updateProfileAction);
  const navigate = useNavigate();
  const setNotification = useActionWithDispatch(setNotificationAction);
  const cancelUpdateProfile = useActionWithDispatch(cancelUpdateProfileAction);

  useEffect(
    () => () => {
      if (pendingUpdateProfile) {
        cancelUpdateProfile();
      }
    },
    [pendingUpdateProfile, cancelUpdateProfile],
  );

  const handleBack = useCallback(() => {
    navigate(ACCOUNT_PATH);
  }, [navigate]);

  useBackSwipe(handleBack);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  const handleSubmit = useCallback(
    ({ city, countryName, timeZoneId }: GetLocationResponseType) => {
      if (user && user.city !== city) {
        updateLocation({
          ...user,
          userId: user.id,
          practiceLanguageId: user.practiceLanguage.id,
          interfaceLanguageId: user.interfaceLanguage.id,
          countryName,
          city,
          timeZoneId,
        })
          .then(() => {
            handleBack();
            setNotification({
              id: dayjs().unix(),
              type: TooltipType.SUCCESS,
              text: t('account.location.changed'),
            });
          })
          .catch((e: AxiosError) => {
            if (e.code !== AxiosErros.Cancelled) {
              setNotification({
                id: dayjs().unix(),
                type: TooltipType.ERROR,
                text: t('errors.location'),
              });
            }
          });
      } else {
        handleBack();
      }
    },
    [user, handleBack, setNotification, updateLocation, t],
  );

  return (
    <div className={classNames(styles.container)}>
      <h2>{t('account.location.newLocation')}</h2>
      <p className={styles.text}>{t('account.location.text')}</p>
      <CountriesAutocomplete
        onChangeLocation={handleSubmit}
        defaultCity={user?.city}
        defaultCountry={user?.countryName}
      />
    </div>
  );
};

export default AccountLocation;
