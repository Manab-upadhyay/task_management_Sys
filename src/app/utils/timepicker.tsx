// BasicTimePicker.tsx
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useTime } from '../context/timepicker'; // Use the correct path

export default function BasicTimePicker() {
    const { selectedTime, setSelectedTime } = useTime();

    console.log("Time Picker selectedTime:", selectedTime);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker 
                    label="Set Your Time"
                    value={selectedTime}
                    onChange={(newValue) => {
                        console.log("New time selected:", newValue);
                        setSelectedTime(newValue);
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    ); 
}
