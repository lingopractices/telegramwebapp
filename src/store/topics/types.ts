import { ITopic } from 'lingopractices-models';

export interface ITopicsState {
  topics: ITopic[];
  requests: {
    getTopicsPending: boolean;
  };
}
