import React, { useCallback, useState } from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import { ReactComponent as LeftIcon } from '@assets/icons/left-arrow.svg';
import { ReactComponent as LeftDisableIcon } from '@assets/icons/left-disabled-arrow.svg';
import { ReactComponent as RightIcon } from '@assets/icons/right-arrow.svg';
import { createTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';

import styles from './Date.module.scss';

interface IDateProps {
  date: Dayjs | null;
  onChange: (newDate: Dayjs | null) => void;
}

const theme = createTheme({});

const Date: React.FC<IDateProps> = ({ date, onChange }) => {
  const [isFirstMonth, setIsFirstMonth] = useState(true);

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
          onChange={onChange}
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
export default Date;
