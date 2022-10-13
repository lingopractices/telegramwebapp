import { Route } from 'react-router-dom';
import {
  ACCOUNT_INTERFACE_LANGUAGES_PATH,
  ACCOUNT_LANGUAGES_PATH,
  ACCOUNT_LEVELS_PATH,
  ACCOUNT_PATH,
} from 'routing/routing.constants';
import deleteLineFromPath from 'routing/utils/deleteLineFromPath';
import AccountInterfaceLanguage from 'screens/account/AccountInterfaceLanguage';
import AccountLanguage from 'screens/account/AccountLanguage';
import AccountLevel from 'screens/account/AccountLevel';

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
};

export default Object.values(AccountRoutes);
