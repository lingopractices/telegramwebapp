// const ROOT_API = `https://api-prod-akpa7.ondigitalocean.app/api`;
const ROOT_API = `https://api-development-plha2.ondigitalocean.app/api`;

export const MAIN_API = {
  SEARCH_MEETINGS: `${ROOT_API}/meetings/search`,
  JOIN_MEETING: `${ROOT_API}/meetings/join`,
  GET_MEETING_DAYS_BY_PREFERENCES: `${ROOT_API}/meetings/days`,
  SEARCH_TOPICS: `${ROOT_API}/topics/search`,
  GET_QUESTIONS_BY_TOPIC_ID: `${ROOT_API}/topic/:topicId/questions`,
  GET_USER: `${ROOT_API}/user`,
  UPDATE_USER: `${ROOT_API}/user`,
  GET_LANGUAGES: `${ROOT_API}/languages`,
  CREATE_MEETING: `${ROOT_API}/meeting`,
  GET_MY_MEETINGS: `${ROOT_API}/user/meetings?userId=:userId&offset=:offset&limit=:limit`,
  LEAVE_MEETING: `${ROOT_API}/meetings/:meetingId/leave?userId=:userId`,
  GET_NOTIFICATIONS_PREFERENCES: `${ROOT_API}/notification-preferences`,
  CREATE_NOTIFICATIONS_PREFERENCES: `${ROOT_API}/notification-preferences`,
  UPDATE_NOTIFICATIONS_PREFERENCES: `${ROOT_API}/notification-preferences`,
};
