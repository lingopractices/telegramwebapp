import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { AxiosResponse } from 'axios';
import { IGetMeetingDatesRequest } from 'lingopractices-models';
import { call, put } from 'redux-saga/effects';

import { GetMeetingDaysSuccess } from './get-meeting-days-success';

export class GetMeetingDays {
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
    return function* ({ payload }: ReturnType<typeof GetMeetingDays.action>) {
      const { data } = GetMeetingDays.httpRequest.call(
        yield call(() => GetMeetingDays.httpRequest.generator(payload)),
      );

      yield put(GetMeetingDaysSuccess.action(data));
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<string[]>, IGetMeetingDatesRequest>(
      MAIN_API.GET_MEETING_DAYS_BY_PREFERENCES,
      HttpRequestMethod.Post,
    );
  }
}
