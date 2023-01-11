// const ROOT_API = `https://api-prod-akpa7.ondigitalocean.app/api`;
const ROOT_API = `https://api-development-plha2.ondigitalocean.app/api`;

export const MAIN_API = {
  SEARCH_MEETINGS: `${ROOT_API}/meetings/search`,
  JOIN_MEETING: `${ROOT_API}/meetings/join`,
  GOOGLE_REAUTH: `${ROOT_API}/user-google-info/login`,
  GET_MEETING_DAYS_BY_PREFERENCES: `${ROOT_API}/meetings/days`,
  SEARCH_TOPICS: `${ROOT_API}/topics/search`,
  GET_QUESTIONS_BY_TOPIC_ID: `${ROOT_API}/topic/:topicId/questions`,
  GET_USER: `${ROOT_API}/user`,
  UPDATE_USER: `${ROOT_API}/user`,
  GET_LANGUAGES: `${ROOT_API}/languages`,
  CREATE_MEETING: `${ROOT_API}/meeting`,
  GET_MY_MEETINGS: `${ROOT_API}/user/meetings?userId=:userId&offset=:offset&limit=:limit`,
  LEAVE_MEETING: `${ROOT_API}/meetings/:meetingId/leave?userId=:userId`,
  NOTIFICATIONS_PREFERENCES: `${ROOT_API}/notification-preferences`,
  GET_CREATE_MEETING_CONTENT: `${ROOT_API}/content/messages/create-meeting?locale=:locale`,
};

export const ABSTRACT_API = `https://ipgeolocation.abstractapi.com/v1/?api_key=${
  import.meta.env.VITE_ABSTRACT_API_KEY
}`;

const MAIN_GOOGLE_API = 'https:/maps.googleapis.com/maps/api/';

export const GOOGLE_API = {
  GET_TIMEZONE: `${MAIN_GOOGLE_API}timezone/json?location=:lat%2C:lng&timestamp=:timeStamp&key=:apiKey`,
};
