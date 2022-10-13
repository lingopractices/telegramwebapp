import { createAction } from '@reduxjs/toolkit';
import { ITopicsState } from '@store/topics/types';

export class GetQuestionsByTopicIdSuccess {
  static get action() {
    return createAction<{ [id: number]: string[] }>('topics/GET_QUESTIONS_SUCCESS');
  }

  static get reducer() {
    return (
      draft: ITopicsState,
      { payload }: ReturnType<typeof GetQuestionsByTopicIdSuccess.action>,
    ) => {
      draft.requests.getQuestionsPending = false;

      draft.questions = { ...draft.questions, ...payload };

      return draft;
    };
  }
}
