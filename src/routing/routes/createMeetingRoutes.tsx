import DateAndTimePage from 'pages/DateAndTimePage/DateAndTimePage';
import LanguagesPage from 'pages/LanguagePage/LanguagePage';
import LevelPage from 'pages/LevelPage/LevelPage';
import ParticpinatsCountPage from 'pages/ParticpinatsCountPage/ParticpinatsCount';
import TopicPage from 'pages/TopicPage/TopicPage';
import { Route } from 'react-router-dom';
import {
  CREATE_DATE_PATH,
  CREATE_LANGUAGES_PATH,
  CREATE_LEVELS_PATH,
  CREATE_PARTICIPANTS_PATH,
  CREATE_PATH,
  CREATE_TOPICS_PATH,
} from 'routing/routing.constants';
import deleteLineFromPath from 'routing/utils/deleteLineFromPath';

import { CreateRoutesEnum, CreateRoutesObject } from '../routing.types';

const CreateRoutes: CreateRoutesObject = {
  [CreateRoutesEnum.LANAGUAGES_CREATE]: {
    path: `${deleteLineFromPath(CREATE_LANGUAGES_PATH, `${CREATE_PATH}/`)}`,
    pageName: 'Languages',
    props: {
      element: LanguagesPage,
      children: <Route path='*' element={<LanguagesPage />} />,
    },
  },
  [CreateRoutesEnum.LEVELS_CREATE]: {
    path: `${deleteLineFromPath(CREATE_LEVELS_PATH, `${CREATE_PATH}/`)}`,
    pageName: 'Level',
    props: {
      element: LevelPage,
      children: <Route path='*' element={<LevelPage />} />,
    },
  },
  [CreateRoutesEnum.TOPICS_CREATE]: {
    path: `${deleteLineFromPath(CREATE_TOPICS_PATH, `${CREATE_PATH}/`)}`,
    pageName: 'topics',
    props: {
      element: TopicPage,
      children: <Route path='*' element={<TopicPage />} />,
    },
  },
  [CreateRoutesEnum.PARTICIPIANTS_CREATE]: {
    path: `${deleteLineFromPath(CREATE_PARTICIPANTS_PATH, `${CREATE_PATH}/`)}`,
    pageName: 'Participants',
    props: {
      element: ParticpinatsCountPage,
      children: <Route path='*' element={<ParticpinatsCountPage />} />,
    },
  },
  [CreateRoutesEnum.DATE_CREATE]: {
    path: `${deleteLineFromPath(CREATE_DATE_PATH, `${CREATE_PATH}/`)}`,
    pageName: 'Date',
    props: {
      element: DateAndTimePage,
      children: <Route path='*' element={<DateAndTimePage />} />,
    },
  },
};

export default Object.values(CreateRoutes);
