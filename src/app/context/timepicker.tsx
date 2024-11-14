// context/TimeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dayjs } from 'dayjs';

interface TimeContextType {
    selectedTime: Dayjs | null;
    setSelectedTime: (time: Dayjs | null) => void;
}

// Create a context
const TimeContext = createContext<TimeContextType | undefined>(undefined);

// Create a provider component
export const TimeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

    return (
        <TimeContext.Provider value={{ selectedTime, setSelectedTime }}>
            {children}
        </TimeContext.Provider>
    );
};

// Custom hook for using the TimeContext
export const useTime = () => {
    const context = useContext(TimeContext);
    if (context === undefined) {
        throw new Error("useTime must be used within a TimeProvider");
    }
    return context;
};
