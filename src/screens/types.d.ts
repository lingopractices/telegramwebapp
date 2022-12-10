import { Dayjs } from 'dayjs';
import { LanguageLevel } from 'lingopractices-models';

export type StepDataType = {
  path: string;
  title: string;
  value?: string;
};

export type JoinMeetingType = {
  language: {
    languageId?: string;
    data: StepDataType;
  };
  level: {
    languageLevel?: LanguageLevel;
    data: StepDataType;
  };
  date: {
    from?: Dayjs | null;
    data: StepDataType;
  };
};

export type CreateMeetingType = {
  language: {
    languageId?: string;
    data: StepDataType;
  };
  level: {
    languageLevel?: LanguageLevel;
    data: StepDataType;
  };
  topic: {
    topicId?: number;
    data: StepDataType;
  };
  number: {
    peopleNumber?: number;
    data: StepDataType;
  };
  date: {
    meetingDate: Dayjs | null;
    data: StepDataType;
  };
  time: {
    meetingTime: Dayjs;
    data: StepDataType;
  };
};

export type CreateAlertType = {
  languageId?: string;
  languageLevels?: LanguageLevel;
  rootPath?: string;
};
