import LanguagesPage from 'pages/LanguagePage/LanguagePage';
import LevelPage from 'pages/LevelPage/LevelPage';
import { Route } from 'react-router-dom';
import {
  ACCOUNT_INTERFACE_LANGUAGES_PATH,
  ACCOUNT_LANGUAGES_PATH,
  ACCOUNT_LEVELS_PATH,
  ACCOUNT_PATH,
} from 'routing/routing.constants';
import deleteLineFromPath from 'routing/utils/deleteLineFromPath';

import { AccountRoutesEnum, AccountRoutesObject } from '../routing.types';

const AccountRoutes: AccountRoutesObject = {
  [AccountRoutesEnum.LANAGUAGES_ACCOUNT]: {
    path: `${deleteLineFromPath(ACCOUNT_LANGUAGES_PATH, `${ACCOUNT_PATH}/`)}`,
    pageName: 'Languages',
    props: {
      element: LanguagesPage,
      children: <Route path='*' element={<LanguagesPage />} />,
    },
  },
  [AccountRoutesEnum.INTERFACE_LANGUAGES_ACCOUNT]: {
    path: `${deleteLineFromPath(ACCOUNT_INTERFACE_LANGUAGES_PATH, `${ACCOUNT_PATH}/`)}`,
    pageName: 'InterfaceLanguages',
    props: {
      element: LanguagesPage,
      children: <Route path='*' element={<LanguagesPage />} />,
    },
  },
  [AccountRoutesEnum.LEVELS_ACCOUNT]: {
    path: `${deleteLineFromPath(ACCOUNT_LEVELS_PATH, `${ACCOUNT_PATH}/`)}`,
    pageName: 'Levels',
    props: {
      element: LevelPage,
      children: <Route path='*' element={<LevelPage />} />,
    },
  },
};

export default Object.values(AccountRoutes);