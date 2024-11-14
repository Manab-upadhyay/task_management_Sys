import { useState } from 'react';
import { Dayjs } from 'dayjs';

export function useTimePicker() {
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

    return { selectedTime, setSelectedTime };
}
