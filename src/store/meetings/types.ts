import { IMeeting } from 'lingopractices-models';

export interface IMeetingsState {
  meetings: IMeeting[];
  myMeetings: IMeeting[];
  meetingDays: string[];
  selectedMeeting?: IMeeting;
  requests: {
    getMeetingsPending: boolean;
    getMyMeetingsPending: boolean;
    getMeetingDaysPending: boolean;
    createMeetingPending: boolean;
    joinMeetingPending: boolean;
  };
}
