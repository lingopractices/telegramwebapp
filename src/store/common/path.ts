const ROOT_API = `https://lingo-practices-api-xcn2o.ondigitalocean.app/api`;

export const MAIN_API = {
  GET_MEETING_BY_ID: `${ROOT_API}/meetings/:meetingId`,
  SEARCH_MEETINGS: `${ROOT_API}/meetings/search`,
  JOIN_MEETING: `${ROOT_API}/meetings/join`,
  GET_MEETING_DAYS_BY_PREFERENCES: `${ROOT_API}/meetings/days`,
  GET_TOPIC_BY_ID: `${ROOT_API}/topics/:topicId`,
  SEARCH_TOPICS: `${ROOT_API}/topics/search`,
  GET_QUESTIONS_BY_TOPIC_ID: `${ROOT_API}/topic/:topicId/questions`,
  GET_USER_BY_TELEGRAM_USER_ID: `${ROOT_API}/user/:telegramUserId`,
  UPDATE_USER: `${ROOT_API}/user`,
  GET_LANGUAGES: `${ROOT_API}/languages`,
};
