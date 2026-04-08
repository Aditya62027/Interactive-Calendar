"use client";

export default function DayCell({ date, onClick, startDate, endDate }) {
  const isStart =
    startDate && date.toDateString() === startDate.toDateString();

  const isEnd =
    endDate && date.toDateString() === endDate.toDateString();

  const isInRange =
    startDate &&
    endDate &&
    date >= startDate &&
    date <= endDate;

  const isToday =
    date.toDateString() === new Date().toDateString();

  return (
    <div
      onClick={() => onClick(date)}
      className={`p-2 text-center cursor-pointer transition-all duration-200 hover:scale-105

        ${isStart ? "bg-blue-600 text-white rounded-l-full" : ""}
        ${isEnd ? "bg-blue-600 text-white rounded-r-full" : ""}
        ${isInRange ? "bg-blue-200" : ""}
        ${isToday ? "border-2 border-green-500" : ""}

        hover:bg-gray-200
      `}
    >
      {/* Date number */}

      <div>{date.getDate()}</div>
      {isToday && (
        <div className="text-[10px] text-green-400 mt-1">
          Today
        </div>
      )}
    </div>
  );
}