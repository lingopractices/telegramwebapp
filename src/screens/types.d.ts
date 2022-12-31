import { Dayjs } from 'dayjs';
import { ILanguage, ITopic, LanguageLevel } from 'lingopractices-models';

export type StepDataType = {
  path: string;
  title: string;
  value?: string;
};

export type JoinMeetingType = {
  language: {
    currentLanguage?: ILanguage;
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
    currentLanguage?: ILanguage;
    data: StepDataType;
  };
  level: {
    languageLevel?: LanguageLevel;
    data: StepDataType;
  };
  topic: {
    currentTopic?: ITopic;
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
  language?: ILanguage;
  languageLevels?: LanguageLevel;
  rootPath?: string;
};
