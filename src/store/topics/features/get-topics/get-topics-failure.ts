import { createAction } from '@reduxjs/toolkit';
import { ITopicsState } from '@store/topics/types';

export class GetTopicsFailure {
  static get action() {
    return createAction('topics/GET_TOPICS_FAILURE');
  }

  static get reducer() {
    return (draft: ITopicsState) => {
      draft.requests.getTopicsPending = false;

      return draft;
    };
  }
}
