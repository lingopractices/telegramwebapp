import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { AxiosResponse } from 'axios';
import { IJoinMeetingRequest, IJoinMeetingResponse } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { JoinMeetingSuccess } from './join-meeting-success';

export class JoinMeeting {
  static get action() {
    return createDeferredAction<IJoinMeetingRequest>('meetings/JOIN_MEETING');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.joinMeetingPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* (action: ReturnType<typeof JoinMeeting.action>): SagaIterator {
      try {
        const response = JoinMeeting.httpRequest.call(
          yield call(() => JoinMeeting.httpRequest.generator(action.payload)),
        );

        if (response.data) {
          action.meta?.deferred.resolve();
          yield put(JoinMeetingSuccess.action(action.payload.meetingId));
        }
      } catch (e) {
        action.meta?.deferred.reject(e);
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<IJoinMeetingResponse>, IJoinMeetingRequest>(
      MAIN_API.JOIN_MEETING,
      HttpRequestMethod.Post,
    );
  }
}
