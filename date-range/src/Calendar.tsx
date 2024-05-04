// Calendar.tsx
import React from "react";
import WeekdayDateRangePicker, { PredefinedRange } from "./WeekdayDateRangePicker";
import "./Calendar.css"; 

const Calendar: React.FC = () => {
  const handleDateChange = (
    startDate: Date,
    endDate: Date,
    weekends: Date[]
  ) => {
    console.log(startDate, endDate, weekends);
  };

  const predefinedRanges: PredefinedRange[] = [
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
  ];

  return (
    <div className="header">
      <h1>Weekday Date Range Picker</h1>
      <WeekdayDateRangePicker
        onChange={handleDateChange}
        predefinedRanges={predefinedRanges}
      />
    </div>
  );
};

export default Calendar;
