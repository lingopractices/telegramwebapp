import React, { useState } from 'react';

import ChangeDate from '@components/DateAndTime/ChangeDate/ChangeDate';
import ChangeTime from '@components/DateAndTime/ChangeTime/ChangeTime';
import { Dayjs } from 'dayjs';

const DateAndTime = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<string>('');

  return <div>{!date ? <ChangeDate date={date} onChange={setDate} /> : <ChangeTime selectedTime={time} onChange={setTime} />}</div>;
};

export default DateAndTime;
