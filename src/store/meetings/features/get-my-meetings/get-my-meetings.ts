import { createAction } from '@reduxjs/toolkit';
import { AuthInit } from '@store/auth/features/init-auth/init-auth';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { getMyMeetingsSelector } from '@store/meetings/selectors';
import { IMeetingsState } from '@store/meetings/types';
import { MY_MEETINGS_LIMITS } from '@utils/paginationLimits';
import { replaceInUrl } from '@utils/replace-in-url';
import { AxiosResponse } from 'axios';
import { IMeeting, IPaginationParams } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { GetMyMeetingsSuccess } from './get-my-meetings-success';

export class GetMyMeetings {
  static get action() {
    return createAction('meetings/GET_MY_MEETINGS');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.getMyMeetingsPending = true;
      return draft;
    };
  }

  static get saga() {
    return function* (): SagaIterator {
      const myMeetingList = yield select(getMyMeetingsSelector);

      const page: IPaginationParams = {
        offset: myMeetingList.length,
        limit: MY_MEETINGS_LIMITS,
      };

      try {
        const { data } = GetMyMeetings.httpRequest.call(
          yield call(() => GetMyMeetings.httpRequest.generator({ ...page })),
        );

        const hasMore = data.length >= page.limit;

        yield put(GetMyMeetingsSuccess.action({ data, hasMore }));
        yield put(AuthInit.action());
      } catch (e) {
        // console.log(e);
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<IMeeting[]>, IPaginationParams>(
      ({ offset, limit }: IPaginationParams) =>
        replaceInUrl(MAIN_API.GET_MY_MEETINGS, ['offset', offset], ['limit', limit]),
      HttpRequestMethod.Get,
    );
  }
}
