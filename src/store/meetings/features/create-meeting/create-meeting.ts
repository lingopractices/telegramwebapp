import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { AxiosResponse } from 'axios';
import { ICreateMeetingRequest, IMeeting } from 'lingopractices-models';
import { call, put } from 'redux-saga/effects';

import { CreateMeetingSuccess } from './create-meeting-success';

export class CreateMeeting {
  static get action() {
    return createAction<ICreateMeetingRequest>('meetings/CREATE_MEETING_REQUEST');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.createMeetingPending = true;
      return draft;
    };
  }

  static get saga() {
    return function* ({ payload }: ReturnType<typeof CreateMeeting.action>) {
      const { data } = CreateMeeting.httpRequest.call(
        yield call(() => CreateMeeting.httpRequest.generator(payload)),
      );
      if (data) {
        yield put(CreateMeetingSuccess.action(data));
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<IMeeting>, ICreateMeetingRequest>(
      MAIN_API.CREATE_MEETING,
      HttpRequestMethod.Post,
    );
  }
}
