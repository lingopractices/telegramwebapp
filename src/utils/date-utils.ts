import dayjs, { Dayjs } from 'dayjs';
import { IMeeting } from 'lingopractices-models';

export const getMinTimeOfDay = (date: Dayjs) =>
  date.set('hour', 0).set('minute', 0).set('second', 0);

export const getMaxTimeOfDay = (date: Dayjs) =>
  dayjs(date).set('hour', 23).set('minute', 59).set('second', 0);

export const mergeDateAndTime = (date: Dayjs, time: Dayjs) =>
  date
    .set('hour', time.hour())
    .set('minute', time.minute())
    .set('second', time.second())
    .set('milliseconds', 0);

export const sortGrowingDates = (dates: IMeeting[]) =>
  dates.sort((a, b) => dayjs(a.meetingDate).unix() - dayjs(b.meetingDate).unix());

export const getAvailableTimes = (date: Dayjs) => {
  const availableTimes = [];
  const maxTime = getMaxTimeOfDay(date as Dayjs);
  let minTime;

  if (date.isToday()) {
    const now = dayjs();
    minTime = now
      .set('milliseconds', 0)
      .set('seconds', 0)
      .set('minutes', now.minute() < 30 ? 30 : 0)
      .set('hours', now.minute() > 30 ? now.hour() + 1 : now.hour());
  } else {
    minTime = date.set('minutes', 0).set('second', 0).set('hours', 0);
  }

  while (minTime <= maxTime) {
    availableTimes.push(minTime);
    minTime = minTime.set('minute', minTime.minute() + 30);
  }

  return availableTimes;
};

export const getNextMonthLastDate = (date: Dayjs) => {
  const lastMonth = 11;
  const currentMonth = date.month();
  const currentYear = date.year();

  return getMaxTimeOfDay(
    date
      .set('year', currentMonth === lastMonth ? currentYear + 1 : currentYear)
      .set('month', currentMonth === lastMonth ? 0 : currentMonth + 1),
  ).endOf('month');
};
