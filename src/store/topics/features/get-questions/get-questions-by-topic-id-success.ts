import { createAction } from '@reduxjs/toolkit';
import { ITopicsState } from '@store/topics/types';

export class GetQuestionsByTopicIdSuccess {
  static get action() {
    return createAction<string[]>('topics/GET_QUESTIONS_BY_TOPIC_ID_SUCCESS');
  }

  static get reducer() {
    return (
      draft: ITopicsState,
      { payload }: ReturnType<typeof GetQuestionsByTopicIdSuccess.action>,
    ) => {
      draft.questions = payload;

      draft.requests.getQuestionsByTopicIdPending = false;

      return draft;
    };
  }
}
