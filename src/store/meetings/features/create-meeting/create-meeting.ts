import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { getProfileDataSelector } from '@store/profile/selectors';
import { getTopicsSelector } from '@store/topics/selectors';
import { addPendingRequest } from '@utils/cancel-request';
import { AxiosResponse, CancelTokenSource } from 'axios';
import {
  CreateMeetingResult,
  ICreateMeetingRequest,
  ICreateMeetingResponse,
  IMeeting,
  ITopic,
  IUser,
} from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { CreateMeetingFailure } from './create-meeting-failure';
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
      const { id: userId, gender, countryName: country } = yield select(getProfileDataSelector);

      try {
        const response = CreateMeeting.httpRequest.call(
          yield call(() =>
            CreateMeeting.httpRequest.generator(payload, (token: CancelTokenSource) =>
              addPendingRequest(userId, token),
            ),
          ),
        );

        if (!response) {
          return;
        }

        const {
          data: { googleMeetLink, id, createMeetingResult },
        } = response;

        if (createMeetingResult === CreateMeetingResult.Success) {
          const userCreator: IUser = yield select(getProfileDataSelector);
          const topics: ITopic[] = yield select(getTopicsSelector);
          const meetingTopic = topics.find((topic) => topic.id === payload.topicId);
          const questions = topics.find((topic) => topic.id === payload.topicId);
          const createdMeeting: IMeeting = {
            id,
            meetingDate: payload.meetingAt,
            googleMeetLink,
            languageId: payload.languageId,
            languageLevel: payload.languageLevel,
            participants: [
              {
                userId,
                gender,
                country,
                firstName: window.Telegram.WebApp.initDataUnsafe.user?.first_name || '',
              },
            ],
            topic: {
              id: payload.topicId,
              name: meetingTopic?.name || '',
              questions: questions?.questions || [],
            },
            userCreator,
          };
          yield put(CreateMeetingSuccess.action(createdMeeting));
          meta?.deferred.resolve();
        } else {
          yield put(CreateMeetingFailure.action());
          meta?.deferred.reject(createMeetingResult);
        }
      } catch (e) {
        yield put(CreateMeetingFailure.action());
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
