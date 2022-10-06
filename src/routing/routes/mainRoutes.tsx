import MainPage from 'pages/MainPage/MainPage';
import MeetingPage from 'pages/MeetingPage/MeetingPage';
import { Route } from 'react-router-dom';
import AccountRouter from 'routing/routers/AccountRouter';
import CreateMeetingRouter from 'routing/routers/CreateMeetingRouter';
import JoinMeetingRouter from 'routing/routers/JoinMeetingRouter';

import {
  ACCOUNT_PATH,
  CREATE_PATH,
  INSTANT_MAIN_PATH,
  JOIN_PATH,
  MEETING_PATH,
} from '../routing.constants';
import { MainRoutesEnum, MainRoutesObject } from '../routing.types';

const MainRoutes: MainRoutesObject = {
  [MainRoutesEnum.INSTANT_MAIN]: {
    path: INSTANT_MAIN_PATH,
    pageName: 'Main',
    props: {
      element: MainPage,
      children: [<Route key={INSTANT_MAIN_PATH} path='*' element={<MainPage />} />],
    },
  },
  [MainRoutesEnum.MEETING]: {
    path: MEETING_PATH,
    pageName: 'Meeting',
    props: {
      element: MeetingPage,
      children: [<Route key={MEETING_PATH} path='*' element={<MeetingPage />} />],
    },
  },
  [MainRoutesEnum.ACCOUNT]: {
    path: `${ACCOUNT_PATH}/*`,
    pageName: 'Account',
    props: {
      element: AccountRouter,
    },
  },
  [MainRoutesEnum.CREATE]: {
    path: `${CREATE_PATH}/*`,
    pageName: 'Create',
    props: {
      element: CreateMeetingRouter,
    },
  },
  [MainRoutesEnum.JOIN]: {
    path: `${JOIN_PATH}/*`,
    pageName: 'Join',
    props: {
      element: JoinMeetingRouter,
    },
  },
};

export default Object.values(MainRoutes);