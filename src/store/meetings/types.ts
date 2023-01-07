import { AxiosError } from 'axios';
import { CreateMeetingResult, IMeeting } from 'lingopractices-models';

export interface IMeetingsState {
  meetings: {
    meetingList: IMeeting[];
    hasMore: boolean;
  };
  myMeetings: {
    meetingList: IMeeting[];
    hasMore: boolean;
  };
  meetingDays: string[];
  requests: {
    getMeetingsPending: boolean;
    getMyMeetingsPending: boolean;
    getMeetingDaysPending: boolean;
    createMeetingPending: boolean;
    joinMeetingPending: boolean;
    leaveMeetingPending: boolean;
  };
}

export type CreateMeetingError = {
  e: CreateMeetingResult & AxiosError;
  url?: string;
};
