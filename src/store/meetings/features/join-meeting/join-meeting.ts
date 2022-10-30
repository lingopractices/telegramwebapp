import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { AxiosResponse } from 'axios';
import {
  IJoinMeetingRequest,
  IJoinMeetingResponse,
  JoinMeetingResult,
} from 'lingopractices-models';
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
    return function* ({ payload, meta }: ReturnType<typeof JoinMeeting.action>): SagaIterator {
      try {
        const response = JoinMeeting.httpRequest.call(
          yield call(() => JoinMeeting.httpRequest.generator(payload)),
        );

        const { result } = response.data;

        if (result === JoinMeetingResult.Success) {
          yield put(JoinMeetingSuccess.action(payload.meetingId));
        }

        meta?.deferred.resolve({ result });
      } catch (e) {
        meta?.deferred.reject(e);
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
