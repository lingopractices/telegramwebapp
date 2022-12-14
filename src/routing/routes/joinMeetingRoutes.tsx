import { Route } from 'react-router-dom';
import {
  JOIN_DATE_PATH,
  JOIN_LANGUAGES_PATH,
  JOIN_LEVELS_PATH,
  JOIN_MEETINGS_PATH,
  JOIN_MEETING_PATH,
  JOIN_PATH,
} from 'routing/routing.constants';
import deleteLineFromPath from 'routing/utils/deleteLineFromPath';
import JoinMeetingDate from 'screens/joinMeeting/JoinMeetingDate/JoinMeetingDate';
import JoinMeetingInfo from 'screens/joinMeeting/JoinMeetingInfo/JoinMeetingInfo';
import JoinMeetingLanguage from 'screens/joinMeeting/JoinMeetingLanguage/JoinMeetingLanguage';
import JoinMeetingLevel from 'screens/joinMeeting/JoinMeetingLevel/JoinMeetingLevel';
import JoinMeetingList from 'screens/joinMeeting/JoinMeetingList/JoinMeetingList';

import { JoinRoutesEnum, JoinRoutesObject } from '../routing.types';

const JoinMeetingRoutes: JoinRoutesObject = {
  [JoinRoutesEnum.LANAGUAGES_JOIN]: {
    path: `${deleteLineFromPath(`${JOIN_LANGUAGES_PATH}`, `${JOIN_PATH}`)}`,
    pageName: 'Languages',
    props: {
      element: JoinMeetingLanguage,
      children: <Route path='*' element={<JoinMeetingLanguage />} />,
    },
  },
  [JoinRoutesEnum.LEVELS_JOIN]: {
    path: `${deleteLineFromPath(`${JOIN_LEVELS_PATH}`, `${JOIN_PATH}`)}`,
    pageName: 'Levels',
    props: {
      element: JoinMeetingLevel,
      children: <Route path='*' element={<JoinMeetingLevel />} />,
    },
  },
  [JoinRoutesEnum.DATE_JOIN]: {
    path: `${deleteLineFromPath(`${JOIN_DATE_PATH}`, `${JOIN_PATH}`)}`,
    pageName: 'Date',
    props: {
      element: JoinMeetingDate,
      children: <Route path='*' element={<JoinMeetingDate />} />,
    },
  },
  [JoinRoutesEnum.MEETING_LIST]: {
    path: `${deleteLineFromPath(`${JOIN_MEETINGS_PATH}`, `${JOIN_PATH}`)}`,
    pageName: 'Meeting list',
    props: {
      element: JoinMeetingList,
      children: <Route path='*' element={<JoinMeetingList />} />,
    },
  },
  [JoinRoutesEnum.MEETING_INFO]: {
    path: `${deleteLineFromPath(`${JOIN_MEETING_PATH}`, `${JOIN_PATH}`)}`,
    pageName: 'Meeting info',
    props: {
      element: JoinMeetingInfo,
      children: <Route path='*' element={<JoinMeetingInfo />} />,
    },
  },
};

export default Object.values(JoinMeetingRoutes);
