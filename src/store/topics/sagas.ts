import { all, takeLatest } from 'redux-saga/effects';

import { GetQuestionsByTopicId } from './features/get-questions/get-questions';
import { GetTopics } from './features/get-topics/get-topics';

export function* topicSagas() {
  yield all([
    takeLatest(GetTopics.action, GetTopics.saga),
    takeLatest(GetQuestionsByTopicId.action, GetQuestionsByTopicId.saga),
  ]);
}
