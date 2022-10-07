import DatePage from 'pages/DatePage/DatePage';
import LanguagesPage from 'pages/LanguagePage/LanguagePage';
import LevelPage from 'pages/LevelPage/LevelPage';
import MeetingListPage from 'pages/MeetingLIstPage/MeetingListPage';
import TimePage from 'pages/TimePage/TimePage';
import { Route } from 'react-router-dom';
import {
  JOIN_DATE_PATH,
  JOIN_LANGUAGES_PATH,
  JOIN_LEVELS_PATH,
  JOIN_MEETINGS_PATH,
  JOIN_PATH,
  JOIN_TIME_PATH,
} from 'routing/routing.constants';
import deleteLineFromPath from 'routing/utils/deleteLineFromPath';

import { JoinRoutesEnum, JoinRoutesObject } from '../routing.types';

const JoinMeetingRoutes: JoinRoutesObject = {
  [JoinRoutesEnum.LANAGUAGES_JOIN]: {
    path: `${deleteLineFromPath(`${JOIN_LANGUAGES_PATH}`, `${JOIN_PATH}`)}`,
    pageName: 'Languages',
    props: {
      element: LanguagesPage,
      children: <Route path='*' element={<LanguagesPage />} />,
    },
  },
  [JoinRoutesEnum.LEVELS_JOIN]: {
    path: `${deleteLineFromPath(`${JOIN_LEVELS_PATH}`, `${JOIN_PATH}`)}`,
    pageName: 'Levels',
    props: {
      element: LevelPage,
      children: <Route path='*' element={<LevelPage />} />,
    },
  },
  [JoinRoutesEnum.DATE_JOIN]: {
    path: `${deleteLineFromPath(`${JOIN_DATE_PATH}`, `${JOIN_PATH}`)}`,
    pageName: 'Date',
    props: {
      element: DatePage,
      children: <Route path='*' element={<DatePage />} />,
    },
  },
  [JoinRoutesEnum.TIME_JOIN]: {
    path: `${deleteLineFromPath(`${JOIN_TIME_PATH}`, `${JOIN_PATH}`)}`,
    pageName: 'Time',
    props: {
      element: TimePage,
      children: <Route path='*' element={<TimePage />} />,
    },
  },
  [JoinRoutesEnum.MEETING_LIST]: {
    path: `${deleteLineFromPath(`${JOIN_MEETINGS_PATH}`, `${JOIN_PATH}`)}`,
    pageName: 'Meeting list',
    props: {
      element: MeetingListPage,
      children: <Route path='*' element={<MeetingListPage />} />,
    },
  },
};

export default Object.values(JoinMeetingRoutes);
