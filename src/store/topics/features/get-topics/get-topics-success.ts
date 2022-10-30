import { createAction } from '@reduxjs/toolkit';
import { ITopicsState } from '@store/topics/types';
import { ITopic } from 'lingopractices-models';

interface IGetTopicsSuccess {
  data: ITopic[];
  hasMore: boolean;
}

export class GetTopicsSuccess {
  static get action() {
    return createAction<IGetTopicsSuccess>('topics/GET_TOPICS_SUCCESS');
  }

  static get reducer() {
    return (draft: ITopicsState, { payload }: ReturnType<typeof GetTopicsSuccess.action>) => {
      const { hasMore, data } = payload;

      draft.requests.getTopicsPending = false;
      draft.hasMore = hasMore;
      draft.topics = [...draft.topics, ...data];

      return draft;
    };
  }
}
