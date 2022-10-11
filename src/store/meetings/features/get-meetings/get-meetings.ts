import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { AxiosResponse } from 'axios';
import { IGetMeetingsRequest, IMeeting } from 'lingopractices-models';
import { call, put } from 'redux-saga/effects';

import { GetMeetingsSuccess } from './get-meetings-success';

export class GetMeetings {
  static get action() {
    return createAction<IGetMeetingsRequest>('meetings/GET_MEETINGS_REQUEST');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.getMeetingsPending = true;
      return draft;
    };
  }

  static get saga() {
    return function* ({ payload }: ReturnType<typeof GetMeetings.action>) {
      const { data } = GetMeetings.httpRequest.call(
        yield call(() => GetMeetings.httpRequest.generator(payload)),
      );

      yield put(GetMeetingsSuccess.action(data));
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<IMeeting[]>, IGetMeetingsRequest>(
      MAIN_API.SEARCH_MEETINGS,
      HttpRequestMethod.Post,
    );
  }
}
