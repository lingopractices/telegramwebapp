import React, { useCallback, useState } from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import { ReactComponent as LeftIcon } from '@assets/icons/left-arrow.svg';
import { ReactComponent as LeftDisableIcon } from '@assets/icons/left-disabled-arrow.svg';
import { ReactComponent as RightIcon } from '@assets/icons/right-arrow.svg';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { getMinTimeOfDay, isEquelDates } from '@utils/dateUtils';
import { DAY_MONTH_YAER, MONTH_YAER } from 'common/constants';
import dayjs, { Dayjs } from 'dayjs';

import styles from './DatePicker.module.scss';

interface IDatePicker {
  defaultMeetingDate?: Dayjs;
  freeDays?: string[];
  onChangeDate: (meetingAt: Dayjs) => void;
  loadDays?: (date: Dayjs) => void;
}

const DatePicker: React.FC<IDatePicker> = ({
  defaultMeetingDate,
  freeDays,
  onChangeDate,
  loadDays,
}) => {
  const [isFirstMonth, setIsFirstMonth] = useState(true);
  const [date, setDate] = useState(defaultMeetingDate || null);

  const handleChangeDate = useCallback(
    (value: Dayjs | null) => {
      if (value) {
        let changedDate: Dayjs;

        if (value.isToday()) {
          changedDate = dayjs();
        } else {
          changedDate = getMinTimeOfDay(value);
        }

        setDate(changedDate);
        onChangeDate(changedDate);
      }
    },
    [setDate, onChangeDate],
  );

  const changeViewMonth = useCallback(
    (viewDate: Dayjs) => {
      if (isEquelDates(viewDate, dayjs(), MONTH_YAER)) {
        setIsFirstMonth(true);
      } else {
        setIsFirstMonth(false);
      }

      if (loadDays) loadDays(viewDate);
    },
    [setIsFirstMonth, loadDays],
  );

  const checkDisabledDays = useCallback(
    (nextDate: Dayjs) => {
      if (freeDays) {
        return !freeDays.some((day) => {
          if (isEquelDates(dayjs(day), nextDate, DAY_MONTH_YAER)) {
            return true;
          }
          return false;
        });
      }

      return true;
    },
    [freeDays],
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
          minDate={dayjs().local()}
          shouldDisableDate={freeDays && checkDisabledDays}
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
