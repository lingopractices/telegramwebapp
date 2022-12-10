import { Route } from 'react-router-dom';
import {
  ACCOUNT_INTERFACE_LANGUAGES_PATH,
  ACCOUNT_LANGUAGES_PATH,
  ACCOUNT_LEVELS_PATH,
  ACCOUNT_LOCATION_PATH,
  ACCOUNT_NOTIFICATIONS_CREATE_PATH,
  ACCOUNT_NOTIFICATIONS_EDIT_PATH,
  ACCOUNT_NOTIFICATIONS_LANGUAGES_PATH,
  ACCOUNT_NOTIFICATIONS_PATH,
  ACCOUNT_PATH,
} from 'routing/routing.constants';
import deleteLineFromPath from 'routing/utils/deleteLineFromPath';
import AccountAlerts from 'screens/account/Alerts/AccountAlerts';
import CreateAlert from 'screens/account/CreateAlert/CreateAlert';
import EditAlert from 'screens/account/EditAlert/EditAlert';
import AccountInterfaceLanguage from 'screens/account/InterfaceLanguage/AccountInterfaceLanguage';
import AccountLanguage from 'screens/account/Language/AccountLanguage';
import LanguageAlert from 'screens/account/LanguageAlert/LanguageAlert';
import AccountLevel from 'screens/account/Level/AccountLevel';
import AccountLocation from 'screens/account/Location/AccountLocation';

import { AccountRoutesEnum, AccountRoutesObject } from '../routing.types';

const AccountRoutes: AccountRoutesObject = {
  [AccountRoutesEnum.LANAGUAGES_ACCOUNT]: {
    path: `${deleteLineFromPath(ACCOUNT_LANGUAGES_PATH, `${ACCOUNT_PATH}/`)}`,
    pageName: 'Languages',
    props: {
      element: AccountLanguage,
      children: <Route path='*' element={<AccountLanguage />} />,
    },
  },
  [AccountRoutesEnum.INTERFACE_LANGUAGES_ACCOUNT]: {
    path: `${deleteLineFromPath(ACCOUNT_INTERFACE_LANGUAGES_PATH, `${ACCOUNT_PATH}/`)}`,
    pageName: 'InterfaceLanguages',
    props: {
      element: AccountInterfaceLanguage,
      children: <Route path='*' element={<AccountInterfaceLanguage />} />,
    },
  },
  [AccountRoutesEnum.LEVELS_ACCOUNT]: {
    path: `${deleteLineFromPath(ACCOUNT_LEVELS_PATH, `${ACCOUNT_PATH}/`)}`,
    pageName: 'Levels',
    props: {
      element: AccountLevel,
      children: <Route path='*' element={<AccountLevel />} />,
    },
  },
  [AccountRoutesEnum.LOCATION_ACCOUNT]: {
    path: `${deleteLineFromPath(ACCOUNT_LOCATION_PATH, `${ACCOUNT_PATH}/`)}`,
    pageName: 'Location',
    props: {
      element: AccountLocation,
      children: <Route path='*' element={<AccountLocation />} />,
    },
  },
  [AccountRoutesEnum.NOTIFICATIONS_ACCOUNT]: {
    path: `${deleteLineFromPath(ACCOUNT_NOTIFICATIONS_PATH, `${ACCOUNT_PATH}/`)}`,
    pageName: 'Notifications',
    props: {
      element: AccountAlerts,
      children: <Route path='*' element={<AccountAlerts />} />,
    },
  },
  [AccountRoutesEnum.NOTIFICATIONS_EDIT]: {
    path: `${deleteLineFromPath(ACCOUNT_NOTIFICATIONS_EDIT_PATH, `${ACCOUNT_PATH}/`)}`,
    pageName: 'Edit',
    props: {
      element: EditAlert,
      children: <Route path='*' element={<EditAlert />} />,
    },
  },
  [AccountRoutesEnum.NOTIFICATIONS_CREATE]: {
    path: `${deleteLineFromPath(ACCOUNT_NOTIFICATIONS_CREATE_PATH, `${ACCOUNT_PATH}/`)}`,
    pageName: 'Create',
    props: {
      element: CreateAlert,
      children: <Route path='*' element={<CreateAlert />} />,
    },
  },
  [AccountRoutesEnum.NOTIFICATIONS_LANGUAGES]: {
    path: `${deleteLineFromPath(ACCOUNT_NOTIFICATIONS_LANGUAGES_PATH, `${ACCOUNT_PATH}/`)}`,
    pageName: 'Languages',
    props: {
      element: LanguageAlert,
      children: <Route path='*' element={<LanguageAlert />} />,
    },
  },
};

export default Object.values(AccountRoutes);
