import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useDateContext } from '../context/date';


export default function BasicDatePicker() {
const {selectedDate, setSelectedDate}= useDateContext()
 
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Set The date" 
       
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
       
        />
      </DemoContainer>
    </LocalizationProvider>
  );

}
