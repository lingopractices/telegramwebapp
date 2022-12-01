import { Route } from 'react-router-dom';
import {
  CREATE_DATE_PATH,
  CREATE_LANGUAGES_PATH,
  CREATE_LEVELS_PATH,
  CREATE_PARTICIPANTS_PATH,
  CREATE_PATH,
  CREATE_SUCCESS,
  CREATE_TIME_PATH,
  CREATE_TOPICS_PATH,
} from 'routing/routing.constants';
import deleteLineFromPath from 'routing/utils/deleteLineFromPath';
import CreateMeetingDate from 'screens/createMeeting/CreateMeetingDate';
import CreateMeetingLanguage from 'screens/createMeeting/CreateMeetingLanguage';
import CreateMeetingLevel from 'screens/createMeeting/CreateMeetingLevel';
import CreateMeetingParticipants from 'screens/createMeeting/CreateMeetingParticipants';
import CreateMeetingSuccess from 'screens/createMeeting/CreateMeetingSuccess/CreateMeetingSuccess';
import CreateMeetingTime from 'screens/createMeeting/CreateMeetingTime';
import CreateMeetingTopic from 'screens/createMeeting/CreateMeetingTopic/CreateMeetingTopic';

import { CreateRoutesEnum, CreateRoutesObject } from '../routing.types';

const CreateRoutes: CreateRoutesObject = {
  [CreateRoutesEnum.LANAGUAGES_CREATE]: {
    path: `${deleteLineFromPath(CREATE_LANGUAGES_PATH, `${CREATE_PATH}/`)}`,
    pageName: 'Languages',
    props: {
      element: CreateMeetingLanguage,
      children: <Route path='*' element={<CreateMeetingLanguage />} />,
    },
  },
  [CreateRoutesEnum.LEVELS_CREATE]: {
    path: `${deleteLineFromPath(CREATE_LEVELS_PATH, `${CREATE_PATH}/`)}`,
    pageName: 'Level',
    props: {
      element: CreateMeetingLevel,
      children: <Route path='*' element={<CreateMeetingLevel />} />,
    },
  },
  [CreateRoutesEnum.TOPICS_CREATE]: {
    path: `${deleteLineFromPath(CREATE_TOPICS_PATH, `${CREATE_PATH}/`)}`,
    pageName: 'topics',
    props: {
      element: CreateMeetingTopic,
      children: <Route path='*' element={<CreateMeetingTopic />} />,
    },
  },
  [CreateRoutesEnum.PARTICIPIANTS_CREATE]: {
    path: `${deleteLineFromPath(CREATE_PARTICIPANTS_PATH, `${CREATE_PATH}/`)}`,
    pageName: 'Participants',
    props: {
      element: CreateMeetingParticipants,
      children: <Route path='*' element={<CreateMeetingParticipants />} />,
    },
  },
  [CreateRoutesEnum.DATE_CREATE]: {
    path: `${deleteLineFromPath(CREATE_DATE_PATH, `${CREATE_PATH}/`)}`,
    pageName: 'Date',
    props: {
      element: CreateMeetingDate,
      children: <Route path='*' element={<CreateMeetingDate />} />,
    },
  },
  [CreateRoutesEnum.TIME_CREATE]: {
    path: `${deleteLineFromPath(CREATE_TIME_PATH, `${CREATE_PATH}/`)}`,
    pageName: 'Time',
    props: {
      element: CreateMeetingTime,
      children: <Route path='*' element={<CreateMeetingTime />} />,
    },
  },
  [CreateRoutesEnum.CREATE_SUCCESS]: {
    path: `${deleteLineFromPath(CREATE_SUCCESS, `${CREATE_PATH}/`)}`,
    pageName: 'Success',
    props: {
      element: CreateMeetingSuccess,
      children: <Route path='*' element={<CreateMeetingSuccess />} />,
    },
  },
};

export default Object.values(CreateRoutes);
