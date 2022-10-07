import { createAction } from '@reduxjs/toolkit';
import { ITopicsState } from '@store/topics/types';
import { ITopic } from 'lingopractices-models';

export class GetTopicByIdSuccess {
  static get action() {
    return createAction<ITopic>('topics/GET_TOPIC_SUCCESS');
  }

  static get reducer() {
    return (draft: ITopicsState, { payload }: ReturnType<typeof GetTopicByIdSuccess.action>) => {
      draft.selectedTopic = payload;

      draft.requests.getTopicByIdPending = false;

      return draft;
    };
  }
}
