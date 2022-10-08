import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { ITopicsState } from '@store/topics/types';
import { AxiosResponse } from 'axios';
import { ISearchTopicsRequest, ITopic } from 'lingopractices-models';
import { call, put } from 'redux-saga/effects';

import { GetTopicsSuccess } from './get-topics-success';

export class GetTopicsRequest {
  static get action() {
    return createAction<ISearchTopicsRequest>('topics/GET_TOPICS_REQUEST');
  }

  static get reducer() {
    return (draft: ITopicsState) => {
      draft.requests.getTopicsPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* getTopics({ payload }: ReturnType<typeof GetTopicsRequest.action>) {
      const { data }: AxiosResponse<ITopic[]> = yield call(() =>
        GetTopicsRequest.httpRequest.generator(payload),
      );

      if (data) {
        yield put(GetTopicsSuccess.action(data));
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<ISearchTopicsRequest>(MAIN_API.SEARCH_TOPICS, HttpRequestMethod.Post);
  }
}
