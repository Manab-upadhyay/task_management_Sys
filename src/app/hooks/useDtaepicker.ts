import { useState } from 'react';
import { Dayjs } from 'dayjs';

export function useDatePicker() {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    return { selectedDate, setSelectedDate };
}
