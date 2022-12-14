export type RoutePropsType = {
  caseSensitive?: boolean;
  children?: React.ReactNode;
  element: React.FC;
  index?: boolean;
  path?: string;
};

export type RouteObject = {
  path: string;
  pageName: string;
  props: RoutePropsType;
};

export enum MainRoutesEnum {
  INSTANT_MAIN = 'INSTANT_MAIN',
  MEETING = 'MEETING',
  ACCOUNT = 'ACCOUNT',
  CREATE = 'CREATE',
  JOIN = 'JOIN',
  WITHGOOGLE = 'WITHGOOGLE',
}

export enum AccountRoutesEnum {
  LANAGUAGES_ACCOUNT = 'LANAGUAGES_ACCOUNT',
  INTERFACE_LANGUAGES_ACCOUNT = 'INTERFACE_LANGUAGES_ACCOUNT',
  LEVELS_ACCOUNT = 'LEVELS_ACCOUNT',
  LOCATION_ACCOUNT = 'LOCATION_ACCOUNT',
  NOTIFICATIONS_ACCOUNT = 'NOTIFICATIONS_ACCOUNT',
  NOTIFICATIONS_EDIT = 'NOTIFICATIONS_EDIT',
  NOTIFICATIONS_CREATE = 'NOTIFICATIONS_CREATE',
  NOTIFICATIONS_LANGUAGES = 'NOTIFICATIONS_LANGUAGES',
}

export enum CreateRoutesEnum {
  LANAGUAGES_CREATE = 'LANAGUAGES_CREATE',
  LEVELS_CREATE = 'LEVELS_CREATE',
  TOPICS_CREATE = 'TOPICS_CREATE',
  PARTICIPIANTS_CREATE = 'PARTICIPIANTS_CREATE',
  DATE_CREATE = 'DATE_CREATE',
  TIME_CREATE = 'TIME_CREATE',
  CREATE_SUCCESS = 'CREATE_SUCCESS',
}

export enum JoinRoutesEnum {
  LANAGUAGES_JOIN = 'LANAGUAGES_JOIN',
  LEVELS_JOIN = 'LEVELS_JOIN',
  DATE_JOIN = 'DATE_JOIN',
  MEETING_LIST = 'MEETING_LIST',
  MEETING_INFO = 'MEETING_INFO',
}

export type MainRoutesObject = {
  [key in MainRoutesEnum]: RouteObject;
};

export type AccountRoutesObject = {
  [key in AccountRoutesEnum]: RouteObject;
};

export type CreateRoutesObject = {
  [key in CreateRoutesEnum]: RouteObject;
};

export type JoinRoutesObject = {
  [key in JoinRoutesEnum]: RouteObject;
};
