import { ClearMeetings } from './features/clear-meetings/clear-meetings';
import { CancelCreateMeeting } from './features/create-meeting/cancel-create-meeting';
import { CreateMeeting } from './features/create-meeting/create-meeting';
import { GetMeetingDays } from './features/get-meeting-days/get-meeting-days';
import { GetMeetings } from './features/get-meetings/get-meetings';
import { GetMyMeetings } from './features/get-my-meetings/get-my-meetings';
import { CancelJoinMeeting } from './features/join-meeting/cancel-join-meeting';
import { JoinMeeting } from './features/join-meeting/join-meeting';
import { LeaveMeeting } from './features/leave-meeting/leave-meeting';

export const getMeetingsAction = GetMeetings.action;
export const getMeetingDaysAction = GetMeetingDays.action;
export const getMyMeetingsAction = GetMyMeetings.action;
export const joinMeetingAction = JoinMeeting.action;
export const createMeetingAction = CreateMeeting.action;
export const leaveMeetingAction = LeaveMeeting.action;
export const clearMeetingsAction = ClearMeetings.action;
export const cancelJoinMeetingAction = CancelJoinMeeting.action;
export const cancelCreateMeetingAction = CancelCreateMeeting.action;
