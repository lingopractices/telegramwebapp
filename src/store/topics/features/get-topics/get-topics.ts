import { createDeferredAction } from '@store/common/actions';
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
    return createDeferredAction('topics/GET_TOPICS');
  }

  static get reducer() {
    return (draft: ITopicsState) => {
      draft.requests.getTopicsPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* ({ meta }: ReturnType<typeof GetTopics.action>): SagaIterator {
      const topicList: ITopic[] = yield select(getTopicsSelector);

      const page: IPaginationParams = {
        offset: topicList.length,
        limit: TOPIC_LIMITS,
      };

      try {
        const { data } = GetTopics.httpRequest.call(
          yield call(() => GetTopics.httpRequest.generator({ page })),
        );

        const hasMore = data.length >= page.limit;

        yield put(GetTopicsSuccess.action({ data, hasMore }));
        meta?.deferred.resolve();
      } catch (e) {
        meta?.deferred.reject();
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
