import { IMeeting } from 'lingopractices-models';

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
  selectedMeeting?: IMeeting;
  requests: {
    getMeetingsPending: boolean;
    getMyMeetingsPending: boolean;
    getMeetingDaysPending: boolean;
    createMeetingPending: boolean;
    joinMeetingPending: boolean;
    leaveMeetingPending: boolean;
  };
}
