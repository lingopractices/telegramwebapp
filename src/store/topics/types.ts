import { ITopic } from 'lingopractices-models';

export interface ITopicsState {
  topics: ITopic[];
  hasMore: boolean;
  requests: {
    getTopicsPending: boolean;
  };
}
