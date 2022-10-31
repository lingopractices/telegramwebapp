import dayjs, { Dayjs } from 'dayjs';
import { IMeeting } from 'lingopractices-models';

export const getMinTimeOfDay = (date: Dayjs) =>
  date.set('hour', 0).set('minute', 0).set('second', 0);

export const getMaxTimeOfDay = (date: Dayjs) =>
  date.set('hour', 23).set('minute', 59).set('second', 0);

export const sortGrowingDates = (dates: IMeeting[]) =>
  dates.sort((a, b) => dayjs(a.meetingDate).unix() - dayjs(b.meetingDate).unix());

export const getAvailableTimes = (date: Dayjs) => {
  const resultArr = [];
  const maxTime = dayjs(date.set('hour', 23).set('minutes', 30).set('second', 0));
  let minTime;

  if (date.isToday()) {
    const now = dayjs();
    minTime = now
      .set('second', 0)
      .set('minutes', now.minute() < 30 ? 30 : 0)
      .set('hours', now.minute() > 30 ? now.hour() + 1 : now.hour());
  } else {
    minTime = date.set('minutes', 0).set('second', 0).set('hours', 0);
  }

  while (minTime <= maxTime) {
    resultArr.push(minTime);
    minTime = minTime.set('minute', minTime.minute() + 30);
  }

  return resultArr;
};
