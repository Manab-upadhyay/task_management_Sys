// DateContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dayjs } from 'dayjs';

// Define the type for the context value
interface DateContextType {
    selectedDate: Dayjs | null;
    setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

// Create the context
const DateContext = createContext<DateContextType | undefined>(undefined);

// Create a provider component
export const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
};

// Create a custom hook to use the context
export const useDateContext = () => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error('useDateContext must be used within a DateProvider');
    }
    return context;
};
