import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { getMyMeetingsSelector } from '@store/meetings/selectors';
import { IMeetingsState } from '@store/meetings/types';
import { getProfileDataSelector } from '@store/profile/selectors';
import { MY_MEETINGS_LIMITS } from '@utils/paginationLimits';
import { replaceInUrl } from '@utils/replace-in-url';
import { AxiosResponse } from 'axios';
import { IMeeting, IPaginationParams } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { GetMyMeetingsSuccess } from './get-my-meetings-success';

interface IGetMyMeetingsRequest extends IPaginationParams {
  userId: number;
}

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
      const user = yield select(getProfileDataSelector);

      const page: IPaginationParams = {
        offset: myMeetingList.length,
        limit: MY_MEETINGS_LIMITS,
      };

      const { data } = GetMyMeetings.httpRequest.call(
        yield call(() => GetMyMeetings.httpRequest.generator({ ...page, userId: user.id })),
      );

      const hasMore = data.length >= page.limit;

      yield put(GetMyMeetingsSuccess.action({ data, hasMore }));
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<IMeeting[]>, IGetMyMeetingsRequest>(
      ({ userId, offset, limit }: IGetMyMeetingsRequest) =>
        replaceInUrl(
          MAIN_API.GET_MY_MEETINGS,
          ['userId', userId],
          ['offset', offset],
          ['limit', limit],
        ),
      HttpRequestMethod.Get,
    );
  }
}
