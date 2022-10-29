import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { getProfileDataSelector } from '@store/profile/selectors';
import { getTopicsSelector } from '@store/topics/selectors';
import { AxiosResponse } from 'axios';
import {
  ICreateMeetingRequest,
  ICreateMeetingResponse,
  IMeeting,
  ITopic,
  IUser,
} from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { CreateMeetingSuccess } from './create-meeting-success';

export class CreateMeeting {
  static get action() {
    return createDeferredAction<ICreateMeetingRequest>('meetings/CREATE_MEETING');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.createMeetingPending = true;
      return draft;
    };
  }

  static get saga() {
    return function* ({ payload, meta }: ReturnType<typeof CreateMeeting.action>): SagaIterator {
      try {
        const {
          data: { googleMeetLink, id, isCreated },
        } = CreateMeeting.httpRequest.call(
          yield call(() => CreateMeeting.httpRequest.generator(payload)),
        );

        if (isCreated) {
          const userCreator: IUser = yield select(getProfileDataSelector);
          const topics: ITopic[] = yield select(getTopicsSelector);
          const meetingTopic = topics.find((topic) => topic.id === payload.topicId);
          const questions = topics.find((topic) => topic.id === payload.topicId);
          const createdMeeting: IMeeting = {
            id,
            meetingDate: payload.meetingAt,
            googleMeetLink,
            maxParticipantsCount: payload.peopleNumber,
            participantsCount: 1,
            topic: {
              id: payload.topicId,
              name: meetingTopic?.name || '',
              questions: questions?.questions || [],
            },
            userCreator,
          };

          meta?.deferred.resolve();
          yield put(CreateMeetingSuccess.action(createdMeeting));
        }
      } catch (e) {
        meta?.deferred.reject(e);
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<ICreateMeetingResponse>, ICreateMeetingRequest>(
      MAIN_API.CREATE_MEETING,
      HttpRequestMethod.Post,
    );
  }
}

// это супер проходимое место, его даже собака, когда спускала, могла откинуть. Посмотри по карте там садик и два дома и место прям по-середине
