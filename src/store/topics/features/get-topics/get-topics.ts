import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { getTopicsSelector } from '@store/topics/selectors';
import { ITopicsState } from '@store/topics/types';
import { TOPIC_LIMITS } from '@utils/paginationLimits';
import { AxiosResponse } from 'axios';
import { IPaginationParams, ISearchTopicsRequest, ITopic } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { GetTopicsSuccess } from './get-topics-success';

export class GetTopics {
  static get action() {
    return createAction('topics/GET_TOPICS');
  }

  static get reducer() {
    return (draft: ITopicsState) => {
      draft.requests.getTopicsPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* (): SagaIterator {
      const topicList: ITopic[] = yield select(getTopicsSelector);

      const page: IPaginationParams = {
        offset: topicList.length,
        limit: TOPIC_LIMITS,
      };

      const { data } = GetTopics.httpRequest.call(
        yield call(() => GetTopics.httpRequest.generator({ page })),
      );

      const hasMore = data.length >= page.limit;

      if (data) {
        yield put(GetTopicsSuccess.action({ data, hasMore }));
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<ITopic[]>, ISearchTopicsRequest>(
      MAIN_API.SEARCH_TOPICS,
      HttpRequestMethod.Post,
    );
  }
}
