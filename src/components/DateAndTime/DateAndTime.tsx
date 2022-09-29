import React, { useState } from 'react';

import Date from '@components/DateAndTime/Date/Date';
import Time from '@components/DateAndTime/Time/Time';
import { Dayjs } from 'dayjs';

const DateAndTime = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<string>('');

  return <div>{!date ? <Date date={date} onChange={setDate} /> : <Time selectedTime={time} onChange={setTime} />}</div>;
};

export default DateAndTime;
