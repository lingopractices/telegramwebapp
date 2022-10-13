import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { ITopicsState } from '@store/topics/types';
import { replaceInUrl } from '@utils/replace-in-url';
import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import { GetQuestionsByTopicIdSuccess } from './get-questions-success';

export class GetQuestionsByTopicId {
  static get action() {
    return createAction<number>('topics/GET_QUESTIONS');
  }

  static get reducer() {
    return (draft: ITopicsState) => {
      draft.requests.getQuestionsPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* ({ payload }: ReturnType<typeof GetQuestionsByTopicId.action>) {
      const { data } = GetQuestionsByTopicId.httpRequest.call(
        yield call(() => GetQuestionsByTopicId.httpRequest.generator(payload)),
      );

      if (data) {
        yield put(GetQuestionsByTopicIdSuccess.action({ [payload]: data }));
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<string[]>, number>(
      (topicId: number) => replaceInUrl(MAIN_API.GET_QUESTIONS_BY_TOPIC_ID, ['topicId', topicId]),
      HttpRequestMethod.Post,
    );
  }
}
