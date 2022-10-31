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
  meetingAt?: Dayjs;
  topicId?: number;
  peopleNumber?: number;
};
