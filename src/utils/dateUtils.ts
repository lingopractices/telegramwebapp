import dayjs, { Dayjs } from 'dayjs';

export const getMinTimeOfDay = (date: Dayjs) =>
  date.set('hour', 0).set('minute', 0).set('second', 0);

export const getMaxTimeOfDay = (date: Dayjs) =>
  date.set('hour', 23).set('minute', 59).set('second', 0);

export const getAvailableTimes = (date: Dayjs) => {
  const resultArr = [];
  const maxTime = dayjs(date.set('hour', 23).set('minutes', 30).set('second', 0));
  let minTime;

  if (date.isToday()) {
    minTime = date
      .set('second', 0)
      .set('minutes', date.minute() < 30 ? 30 : 0)
      .set('hours', date.minute() > 30 ? dayjs().hour() + 1 : dayjs().hour());
  } else {
    minTime = date.set('minutes', 0).set('second', 0).set('hours', 0);
  }

  while (minTime <= maxTime) {
    resultArr.push(minTime);
    minTime = minTime.set('minute', minTime.minute() + 30);
  }

  return resultArr;
};
