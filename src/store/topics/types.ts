import { ITopic } from 'lingopractices-models';

export interface ITopicsState {
  topics: ITopic[];
  questions: string[];
  requests: {
    getTopicsPending: boolean;
  };
}
