import { ITopic } from 'lingopractices-models';

export interface ITopicsState {
  topics: ITopic[];
  questions: { [id: number]: string[] };
  requests: {
    getTopicsPending: boolean;
    getQuestionsPending: boolean;
  };
}
