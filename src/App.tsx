import { useMemo } from 'react';

import { getLanguagesAction } from '@store/languages/actions';
import {
  createMeetingAction,
  getMeetingDaysAction,
  getMeetingsAction,
  getMyMeetingsAction,
  joinMeetingAction,
} from '@store/meetings/actions';
import { getProfileAction, UpdateProfileAction } from '@store/profile/actions';
import { getTopicsAction } from '@store/topics/actions';
import { useActionWithDispatch } from 'hooks/use-action-with-dispatch';
import MainRouter from 'routing/routers/MainRouter';

const App = () => {
  const getProfile = useActionWithDispatch(getProfileAction);
  const updateProfile = useActionWithDispatch(UpdateProfileAction);
  const getMeetings = useActionWithDispatch(getMeetingsAction);
  const getMeetingDays = useActionWithDispatch(getMeetingDaysAction);
  const getMyMeetings = useActionWithDispatch(getMyMeetingsAction);
  const createMeeting = useActionWithDispatch(createMeetingAction);
  const joinMeeting = useActionWithDispatch(joinMeetingAction);
  const getLanguages = useActionWithDispatch(getLanguagesAction);
  const getTopics = useActionWithDispatch(getTopicsAction);

  const routing = useMemo(() => <MainRouter />, []);

  return (
    <div>
      <button onClick={() => getProfile()}>GetProfile</button>

      <button
        onClick={() =>
          getTopics({
            page: {
              limit: 20,
              offset: 0,
            },
          })
        }
      >
        getTopics
      </button>

      <button onClick={() => getLanguages()}>getLanguages</button>

      <button
        onClick={() =>
          joinMeeting({
            meetingId: 60,
            userId: 81,
          })
        }
      >
        joinMeeting
      </button>

      <button
        onClick={() =>
          createMeeting({
            languageId: 'en',
            languageLevel: 4,
            meetingAt: '2022-11-10T10:10:22Z',
            peopleNumber: 5,
            topicId: 2,
            userCreatorId: 110,
          })
        }
      >
        createMeeting
      </button>

      <button
        onClick={() =>
          getMyMeetings({
            limit: 20,
            offset: 0,
            userId: 81,
          })
        }
      >
        getMyMeetings
      </button>

      <button
        onClick={() =>
          getMeetingDays({
            languageId: 'en',
            languageLevel: null,
            from: '2022-11-01T10:10:22Z',
            userId: 81,
          })
        }
      >
        getMeetingDays
      </button>

      <button
        onClick={() =>
          getMeetings({
            languageId: 'en',
            languageLevel: null,
            from: '2022-11-01T14:15:22Z',
            userId: 81,
            page: {
              offset: 0,
              limit: 20,
            },
          })
        }
      >
        getMeetings
      </button>

      <button
        onClick={() =>
          updateProfile({
            userId: 81,
            gender: 2,
            countryName: 'Poland',
            practiceLanguageId: 'en',
            interfaceLanguageId: 'en',
            languageLevel: 3,
          })
        }
      >
        UpdateProfile
      </button>

      <div>{routing}</div>
    </div>
  );
};

export default App;
