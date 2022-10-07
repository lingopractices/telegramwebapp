import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { ITopicsState } from '@store/topics/types';
import { replaceInUrl } from '@utils/replace-in-url';
import { call, put } from 'redux-saga/effects';

import { GetTopicByIdSuccess } from './get-topic-by-id-success';

export class GetTopicByIdRequest {
  static get action() {
    return createAction<number>('topics/GET_TOPIC_REQUEST');
  }

  static get reducer() {
    return (draft: ITopicsState) => {
      draft.requests.getTopicByIdPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* getTopicById({ payload }: ReturnType<typeof GetTopicByIdRequest.action>) {
      const { data } = yield call(() => GetTopicByIdRequest.httpRequest.generator(payload));

      if (data) {
        yield put(GetTopicByIdSuccess.action(data));
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory(
      (topicId: number) => replaceInUrl(MAIN_API.GET_TOPIC_BY_ID, ['topicId', topicId]),
      HttpRequestMethod.Get,
    );
  }
}
