import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { AxiosResponse } from 'axios';
import { IGetMeetingDatesRequest } from 'lingopractices-models';
import { call, put } from 'redux-saga/effects';

import { GetMeetingDaysSuccess } from './get-meeting-days-success';

export class GetMeetingDaysRequest {
  static get action() {
    return createAction<IGetMeetingDatesRequest>('meetings/GET_MEETING_DAYS_REQUEST');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.getMeetingDaysPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* getMeetingDays({ payload }: ReturnType<typeof GetMeetingDaysRequest.action>) {
      const { data }: AxiosResponse<string[]> = yield call(() =>
        GetMeetingDaysRequest.httpRequest.generator(payload),
      );

      yield put(GetMeetingDaysSuccess.action(data));
    };
  }

  static get httpRequest() {
    return httpRequestFactory<IGetMeetingDatesRequest>(
      MAIN_API.GET_MEETING_DAYS_BY_PREFERENCES,
      HttpRequestMethod.Post,
    );
  }
}
