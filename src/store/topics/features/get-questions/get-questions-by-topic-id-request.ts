import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { ITopicsState } from '@store/topics/types';
import { replaceInUrl } from '@utils/replace-in-url';
import { call, put } from 'redux-saga/effects';

import { GetQuestionsByTopicIdSuccess } from './get-questions-by-topic-id-success';

export class GetQuestionsByTopicIdRequest {
  static get action() {
    return createAction<number>('topics/GET_QUESTIONS_BY_TOPIC_ID_REQUEST');
  }

  static get reducer() {
    return (draft: ITopicsState) => {
      draft.requests.getQuestionsByTopicIdPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* getQuestions({
      payload,
    }: ReturnType<typeof GetQuestionsByTopicIdRequest.action>) {
      const { data } = yield call(() =>
        GetQuestionsByTopicIdRequest.httpRequest.generator(payload),
      );

      if (data) {
        yield put(GetQuestionsByTopicIdSuccess.action(data));
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory(
      (topicId: number) => replaceInUrl(MAIN_API.GET_QUESTIONS_BY_TOPIC_ID, ['topicId', topicId]),
      HttpRequestMethod.Post,
    );
  }
}
