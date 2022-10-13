import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { replaceInUrl } from '@utils/replace-in-url';
import { AxiosResponse } from 'axios';
import { IMeeting, IPaginationParams } from 'lingopractices-models';
import { call, put } from 'redux-saga/effects';

import { GetMyMeetingsSuccess } from './get-my-meetings-success';

interface IGetMyMeetingsRequest extends IPaginationParams {
  userId: number;
}

export class GetMyMeetings {
  static get action() {
    return createAction<IGetMyMeetingsRequest>('meetings/GET_MY_MEETINGS');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.getMyMeetingsPending = true;
      return draft;
    };
  }

  static get saga() {
    return function* ({ payload }: ReturnType<typeof GetMyMeetings.action>) {
      const { data } = GetMyMeetings.httpRequest.call(
        yield call(() => GetMyMeetings.httpRequest.generator(payload)),
      );

      yield put(GetMyMeetingsSuccess.action(data));
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
