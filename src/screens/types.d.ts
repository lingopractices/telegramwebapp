import { Dayjs } from 'dayjs';
import { LanguageLevel } from 'lingopractices-models';

export type JoinMeetingType = {
  userId?: number;
  languageId?: string;
  languageLevel?: LanguageLevel;
  from?: Dayjs | null;
};

export type CreateMeetingType = {
  userCreatorId?: number;
  languageId?: string;
  languageLevel?: LanguageLevel;
  meetingDate: Dayjs | null;
  meetingTime: Dayjs;
  topicId?: number;
  peopleNumber?: number;
};
