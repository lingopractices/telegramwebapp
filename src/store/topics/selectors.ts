import { RootState } from '@store/store';

export const getTopicsSelector = (state: RootState) => state.topics.topics;
export const getQuestionsSelector = (state: RootState) => state.topics.questions;
