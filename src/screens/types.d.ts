import { LanguageLevel } from 'lingopractices-models';

export type JoinMeetingType = {
  userId?: number;
  languageId?: string;
  languageLevel?: LanguageLevel;
  from?: string;
};

export type CreateMeetingType = {
  userCreatorId?: number;
  languageId?: string;
  languageLevel?: LanguageLevel;
  meetingAt?: string;
  topicId?: number;
  peopleNumber?: number;
};
