import { IMeeting } from 'lingopractices-models';

export interface IMeetingsState {
  meetings: IMeeting[];
  meetingDays: string[];
  selectedMeeting?: IMeeting;
  requests: {
    getMeetingsPending: boolean;
    getMeetingDaysPending: boolean;
    getSelectedMeetingPending: boolean;
    createMeetingPending: boolean;
    joinMeetingPending: boolean;
  };
}
