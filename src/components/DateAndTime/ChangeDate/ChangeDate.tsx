import React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface IChangeDateProps {
  date: Dayjs | null;
  onChange: (newDate: Dayjs | null) => void;
}

const ChangeDate: React.FC<IChangeDateProps> = ({ date, onChange }) => (
  <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs='desktop'
        openTo='day'
        value={date}
        onChange={onChange}
        renderInput={(params) => <input />}
        minDate={dayjs()}
      />
    </LocalizationProvider>
  </div>
);
export default ChangeDate;
