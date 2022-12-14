import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { AxiosResponse } from 'axios';
import { IGetMeetingDatesRequest } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { GetMeetingDaysSuccess } from './get-meeting-days-success';
import { GetMeetingDaysFailure } from './get-meetings-days-failure';

export class GetMeetingDays {
  static get action() {
    return createDeferredAction<IGetMeetingDatesRequest>('meetings/GET_MEETING_DAYS');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.getMeetingDaysPending = true;
      return draft;
    };
  }

  static get saga() {
    return function* ({ payload, meta }: ReturnType<typeof GetMeetingDays.action>): SagaIterator {
      try {
        const { data } = GetMeetingDays.httpRequest.call(
          yield call(() => GetMeetingDays.httpRequest.generator(payload)),
        );

        yield put(GetMeetingDaysSuccess.action(data));
        meta?.deferred.resolve(data);
      } catch (e) {
        yield put(GetMeetingDaysFailure.action());
        meta?.deferred.reject(e);
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<string[]>, IGetMeetingDatesRequest>(
      MAIN_API.GET_MEETING_DAYS_BY_PREFERENCES,
      HttpRequestMethod.Post,
    );
  }
}
