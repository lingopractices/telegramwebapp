import React, { useCallback, useEffect } from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import { ReactComponent as LeftIcon } from '@assets/icons/left-disabled-arrow.svg';
import { ReactComponent as RightIcon } from '@assets/icons/right-arrow.svg';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DAY_MONTH_YAER } from 'common/constants';
import dayjs, { Dayjs } from 'dayjs';
import i18n from 'localization/i18n';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const changeViewMonth = useCallback(
    (viewDate: Dayjs) => {
      if (onChangeMonth) onChangeMonth(viewDate);
    },
    [onChangeMonth],
  );

  useEffect(() => {
    if (defaultDate) {
      changeViewMonth(defaultDate);
    }
  }, [defaultDate, changeViewMonth]);

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
      <h2>{t('date.chooseDate')}</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language}>
        <div className={styles.dateWrapper}>
          <StaticDatePicker
            views={['day']}
            className={styles.picker}
            displayStaticWrapperAs='desktop'
            openTo='day'
            onMonthChange={changeViewMonth}
            value={defaultDate}
            onChange={onChangeDate}
            renderInput={(params) => <input />}
            minDate={dayjs()}
            shouldDisableDate={availableDays && checkDisabledDays}
            components={{
              SwitchViewIcon: DownArrow,
              RightArrowIcon: RightIcon,
              LeftArrowIcon: LeftIcon,
            }}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
};
export default DatePicker;
