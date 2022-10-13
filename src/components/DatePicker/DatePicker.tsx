import React, { useCallback, useEffect, useState } from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import { ReactComponent as LeftIcon } from '@assets/icons/left-arrow.svg';
import { ReactComponent as LeftDisableIcon } from '@assets/icons/left-disabled-arrow.svg';
import { ReactComponent as RightIcon } from '@assets/icons/right-arrow.svg';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';

import styles from './DatePicker.module.scss';

interface IDatePicker {
  onChangeDate: (meetingAt: string) => void;
  defaultMeetingDate?: string;
}

const DatePicker: React.FC<IDatePicker> = ({ defaultMeetingDate, onChangeDate }) => {
  const [isFirstMonth, setIsFirstMonth] = useState(true);
  const [date, setDate] = useState<Dayjs | null>(dayjs(defaultMeetingDate) || null);

  const handleChangeDate = useCallback(
    (value: Dayjs | null) => {
      if (value) {
        if (value.isToday()) {
          setDate(dayjs());
        } else {
          setDate(dayjs(value).set('hour', 0).set('minute', 0).set('second', 0));
        }
      }
    },
    [setDate],
  );

  useEffect(() => {
    if (date) onChangeDate(date.toString());
  }, [date, onChangeDate]);

  const changeViewMonth = useCallback(
    (viewDate: Dayjs) => {
      if (viewDate.month() === dayjs().month()) {
        setIsFirstMonth(true);
      } else {
        setIsFirstMonth(false);
      }
    },
    [setIsFirstMonth],
  );

  return (
    <div className={styles.container}>
      <h2>{'choose meeting date'.toUpperCase()}</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          className={styles.picker}
          displayStaticWrapperAs='desktop'
          openTo='day'
          onMonthChange={changeViewMonth}
          value={date}
          onChange={handleChangeDate}
          renderInput={(params) => <input />}
          minDate={dayjs()}
          components={{
            SwitchViewIcon: DownArrow,
            RightArrowIcon: RightIcon,
            LeftArrowIcon: isFirstMonth ? LeftDisableIcon : LeftIcon,
          }}
        />
      </LocalizationProvider>
    </div>
  );
};
export default DatePicker;
