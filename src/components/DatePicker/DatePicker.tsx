import React, { useCallback, useEffect, useState } from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import { ReactComponent as LeftIcon } from '@assets/icons/left-arrow.svg';
import { ReactComponent as LeftDisableIcon } from '@assets/icons/left-disabled-arrow.svg';
import { ReactComponent as RightIcon } from '@assets/icons/right-arrow.svg';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import { getMinTimeOfDay } from '@utils/dateUtils';
import { DAY_MONTH_YAER, MONTH_YAER } from 'common/constants';
import dayjs, { Dayjs } from 'dayjs';

import styles from './DatePicker.module.scss';

interface IDatePicker {
  defaultDate?: Dayjs | null;
  availableDays?: string[];
  onChangeDate: (value: Dayjs | null) => void;
  onChangeMonth?: (date: Dayjs) => void;
}

const DatePicker: React.FC<IDatePicker> = ({
  defaultDate,
  availableDays,
  onChangeDate,
  onChangeMonth,
}) => {
  const [isFirstMonth, setIsFirstMonth] = useState(true);
  const [date, setDate] = useState(defaultDate || null);

  useEffect(() => {
    onChangeDate(date);
  }, [date, onChangeDate]);

  const changeViewMonth = useCallback(
    (viewDate: Dayjs) => {
      if (viewDate.format(MONTH_YAER) === dayjs().format(MONTH_YAER)) {
        setIsFirstMonth(true);
      } else {
        setIsFirstMonth(false);
      }

      if (onChangeMonth) onChangeMonth(viewDate);
    },
    [setIsFirstMonth, onChangeMonth],
  );

  const checkDisabledDays = useCallback(
    (nextDate: Dayjs) => {
      if (availableDays) {
        return !availableDays.some((day) => {
          if (nextDate.format(DAY_MONTH_YAER) === dayjs(day).format(DAY_MONTH_YAER)) {
            return true;
          }
          return false;
        });
      }

      return true;
    },
    [availableDays],
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
          onChange={setDate}
          renderInput={(params) => <input />}
          minDate={dayjs()}
          shouldDisableDate={availableDays && checkDisabledDays}
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
