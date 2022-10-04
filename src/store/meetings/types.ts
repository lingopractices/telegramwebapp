import { IMeeting } from 'lingopractices-models';

export interface IMeetingsState {
  meetings: IMeeting[];
  meetingDays: string[];
  requests: {
    getMeetingsPending: boolean;
    getMeetingDaysPending: boolean;
  };
}
