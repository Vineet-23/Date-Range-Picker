import React, { useState } from "react";
import "./WeekdayDateRangePicker.css"; 

export interface PredefinedRange {
  label: string;
  days: number;
}

interface WeekdayDateRangePickerProps {
  onChange: (startDate: Date, endDate: Date, weekends: Date[]) => void;
  predefinedRanges: PredefinedRange[];
}

const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({
  onChange,
  predefinedRanges,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [weekendsWithinRange, setWeekendsWithinRange] = useState<Date[]>([]);
  const [error, setError] = useState<string>("");

  const handleStartDateChange = (date: Date | null) => {
    if (date && (date.getDay() === 0 || date.getDay() === 6)) {
      setError("Please select a weekday date.");
    } else {
      setError("");
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date && (date.getDay() === 0 || date.getDay() === 6)) {
      setError("Please select a weekday date.");
    } else {
      setError("");
      setEndDate(date);
    }
  };

  const calculateWeekendsInRange = (start: Date, end: Date) => {
    const weekendsInRange: Date[] = [];
    const current = new Date(start);
    while (current <= end) {
      if (current.getDay() === 0 || current.getDay() === 6) {
        weekendsInRange.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return weekendsInRange;
  };

  const handleSubmit = () => {
    
    if (startDate && endDate) {
      const weekends = calculateWeekendsInRange(startDate, endDate);
      onChange(startDate, endDate, weekends);
      setWeekendsWithinRange(weekends);
    }
  };

  const handlePredefinedRangeChange = (index: number) => {
    const today = new Date();
    const predefinedRange = predefinedRanges[index];
    const start = new Date(
      today.getTime() - (predefinedRange.days - 1) * 24 * 60 * 60 * 1000
    ); 
    const end = today;
    setStartDate(start);
    setEndDate(end);
    const weekends = calculateWeekendsInRange(start, end);
    setWeekendsWithinRange(weekends);
  };

  return (
    <div className="weekday-date-range-picker-container">
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          className="date-input"
          value={startDate ? startDate.toISOString().split("T")[0] : ""}
          onChange={(e) => handleStartDateChange(new Date(e.target.value))}
        />
      </div>
      <div>
        <label>End Date: </label>
        <input
          type="date"
          className="date-input"
          value={endDate ? endDate.toISOString().split("T")[0] : ""}
          onChange={(e) => handleEndDateChange(new Date(e.target.value))}
        />
      </div>
      <button className="btn" onClick={handleSubmit}>Submit</button>
      <div className="preferred-range">
        <label>Select predefined range: </label>
        <select
          className="predefined-range-select"
          onChange={(e) =>
            handlePredefinedRangeChange(parseInt(e.target.value))
          }
        >
          <option value="">Select</option>
          {predefinedRanges.map((range, index) => (
            <option key={index} value={index.toString()}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
      
      {startDate && endDate && weekendsWithinRange.length > 0 && (
        <div className="date-range-info">
          <p>
            Selected Date Range: [{startDate.toISOString().split("T")[0]},{" "}
            {endDate.toISOString().split("T")[0]}]
          </p>
          <p>
            Weekend Dates within Range: [
            {weekendsWithinRange
              .map((date) => date.toISOString().split("T")[0])
              .join(", ")}
            ]
          </p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default WeekdayDateRangePicker;
