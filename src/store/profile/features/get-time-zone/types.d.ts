export type TimeZoneResponseType = {
  dstOffset: number;
  rawOffset: number;
  status: TimeZoneResponseStatus;
  timeZoneId: string;
  timeZoneName: string;
};

export enum TimeZoneResponseStatus {
  OK = 'OK',
  INVALID_REQUEST = 'INVALID_REQUEST',
  OVER_DAILY_LIMIT = 'OVER_DAILY_LIMIT',
  OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
  REQUEST_DENIED = 'REQUEST_DENIED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  ZERO_RESULTS = 'ZERO_RESULTS',
}
