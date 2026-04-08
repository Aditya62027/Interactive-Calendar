"use client";
import { startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";
import DayCell from "./dayshell";
import useDateRange from "../hooks/useDataRange";


export default function CalendarGrid({ currentDate,
  onDateClick,
  startDate,
  endDate, }) {
    
  const start = 
      startOfMonth(currentDate);

  const end =
      endOfMonth(currentDate);

  const days = 
      eachDayOfInterval({ start, end });

  const startDay = 
      getDay(start);

  return (
    <div>
      {/* Week Names */}
      <div className="grid grid-cols-7 mb-2 text-center font-semibold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        
        {/* Empty spaces */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={i}></div>
        ))}

        {days.map((date, i) => (
          <DayCell key={i}
  date={date}
  onClick={onDateClick}
  startDate={startDate}
  endDate={endDate} />
        ))}
      </div>
    </div>
  );
}