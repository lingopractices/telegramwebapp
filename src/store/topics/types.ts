import { ITopic } from 'lingopractices-models';

export interface ITopicsState {
  topics: ITopic[];
  selectedTopic?: ITopic;
  questions: string[];
  requests: {
    getTopicByIdPending: boolean;
    getTopicsPending: boolean;
    getQuestionsByTopicIdPending: boolean;
  };
}
