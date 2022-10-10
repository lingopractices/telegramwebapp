import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { AxiosResponse } from 'axios';
import { IJoinMeetingRequest, IJoinMeetingResponse } from 'lingopractices-models';
import { call } from 'redux-saga/effects';

export class JoinMeetingRequest {
  static get action() {
    return createAction<IJoinMeetingRequest>('meeting/JOIN_MEETING_REQUEST');
  }

  static get reducer() {
    return (draft: IMeetingsState, { payload }: ReturnType<typeof JoinMeetingRequest.action>) => {
      draft.requests.joinMeetingPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* joinMeeting({ payload }: ReturnType<typeof JoinMeetingRequest.action>) {
      const { data } = JoinMeetingRequest.httpRequest.call(
        yield call(() => JoinMeetingRequest.httpRequest.generator(payload)),
      );
      if (data) {
        // yield put(JoinMeetingSuccess.action());
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
