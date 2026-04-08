"use client";

import { useState } from "react";
import CalendarGrid from "./calender-grid";
import NotesPanel from "./notespanel";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [startDate, setStartDate] = useState(null);
 
  const [endDate, setEndDate] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

   // RANGE LOGIC
  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  return (
  <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl">
    
    {/* Header */}

    <div className="flex justify-between mb-4">
      <button onClick={prevMonth}>⬅</button>
      <h2>
        {currentDate.toLocaleString("default", { month: "long" })}{" "}
        {currentDate.getFullYear()}
      </h2>
      <button onClick={nextMonth}>➡</button>
    </div>

    {/*HERO IMAGE*/}

    <div className="relative h-48 rounded-xl overflow-hidden mb-4">
      <img
      src = "/climb-mount-denali-alaska.avif" className="w-full h-full object-cover object-[center_70%]" />
     
      <div className="absolute bottom-3 left-3 text-white">
       
        <h2 className="text-xl font-bold">
           {currentDate.toLocaleString("default", { month: "long" })}
        </h2>
      </div>
    </div>

    {/* Main Layout */}
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CalendarGrid
        currentDate={currentDate}
        onDateClick={handleDateClick}
        startDate={startDate}
        endDate={endDate}
      />

      <NotesPanel selectedDate={selectedDate} />

    </div>
  </div>
);
}