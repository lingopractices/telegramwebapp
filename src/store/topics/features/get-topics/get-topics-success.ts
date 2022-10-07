import { createAction } from '@reduxjs/toolkit';
import { ITopicsState } from '@store/topics/types';
import { ITopic } from 'lingopractices-models';

export class GetTopicsSuccess {
  static get action() {
    return createAction<ITopic[]>('topics/GET_TOPICS_SUCCESS');
  }

  static get reducer() {
    return (draft: ITopicsState, { payload }: ReturnType<typeof GetTopicsSuccess.action>) => {
      draft.requests.getTopicsPending = false;

      draft.topics = payload;

      return draft;
    };
  }
}
