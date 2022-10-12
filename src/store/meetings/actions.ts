import { CreateMeeting } from './features/create-meeting/create-meeting';
import { GetMeetingDays } from './features/get-meeting-days/get-meeting-days';
import { GetMeetings } from './features/get-meetings/get-meetings';
import { GetMyMeetings } from './features/get-my-meetings/get-my-meetings';
import { JoinMeeting } from './features/join-meeting/join-meeting';

export const getMeetingsAction = GetMeetings.action;
export const getMeetingDaysAction = GetMeetingDays.action;
export const getMyMeetingsAction = GetMyMeetings.action;
export const joinMeetingAction = JoinMeeting.action;
export const createMeetingAction = CreateMeeting.action;
