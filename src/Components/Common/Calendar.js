import React, {useCallback, useEffect, useState} from "react";
import {dayDefault, dummyCalendar} from "../../config/conf";

export default function Calendar({dayNames, date, change}) {
  const today = new Date();
  const [dayStrArray, setDayStrArray] = useState(dayDefault);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentCalendar, setCurrentCalendar] = useState(dummyCalendar);

  const init = () => {
    const currentMonth = date ? date.getMonth() : today.getMonth();
    const currentYear = date ? date.getFullYear() : today.getFullYear();
    const dayStrArray = dayNames ? dayNames : dayDefault;

    setDayStrArray(dayStrArray);
    setCurrentMonth(currentMonth);
    setCurrentYear(currentYear);
  };

  useEffect(() => {
    const firstDay = new Date(currentYear, currentMonth).getDay();
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDayOfEnd = new Date(currentYear, currentMonth, 0).getDate();
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;

    const data = [];
    let date = 1;
    let nextDate = 1;
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (col === 0 && (nextDate > 1 || date > lastDay)) {
          // 다음줄 시작할 때 현재달 끝났으면 더 이상 기록 안함.
          break;
        }
        if (row === 0 && col < firstDay) {
          // 이전달 데이터
          data.push({
            year: prevYear,
            mon: prevMonth,
            date: prevMonthDayOfEnd - firstDay + col + 1,
            type: "prev",
          });
        }
        if (row > 3 && date > lastDay) {
          // 다음달 데이터
          data.push({
            year: nextYear,
            mon: nextMonth,
            date: nextDate,
            type: "next",
          });
          nextDate++;
        }
        if ((row === 0 && col >= firstDay) || (row > 0 && date <= lastDay)) {
          // 현재달 데이터
          data.push({
            year: currentYear,
            mon: currentMonth,
            date,
            type: "current",
          });
          date++;
        }
      }
    }
    setCurrentCalendar(data);
  }, [currentYear, currentMonth]);

  const next = useCallback(() => {
    let newMonth = currentMonth + 1;
    if (currentMonth === 11) {
      newMonth = 0;
      setCurrentYear(currentYear + 1);
    }
    setCurrentMonth(newMonth);
  }, [currentMonth, currentYear]);

  const prev = useCallback(() => {
    let newMonth = currentMonth - 1;
    if (currentMonth === 0) {
      newMonth = 11;
      setCurrentYear(currentYear - 1);
    }
    setCurrentMonth(newMonth);
  }, [currentMonth, currentYear]);

  useEffect(init, []);


  return (
    <div className={"calendar-wrapper"} onClick={(e) => e.stopPropagation()}>
      <div className={"calendar-header"}>
        <div className={"calendar-title"}>{`${currentYear}년 ${
          currentMonth + 1
        }월`}</div>
        <div className={"btn-wrapper"}>
          <div className={"btn"} onClick={prev}>
            <i className={"prev-icon"}/>
          </div>
          <div className={"btn next"} onClick={next}>
            <i className={"next-icon"}/>
          </div>
        </div>
      </div>
      <div className={"calendar-body"}>
        <div className={"week"} style={{marginBottom: 10}}>
          {dayStrArray.map((day, k) => (
            <div key={k}>{day}</div>
          ))}
        </div>
        <div className={"calendar"}>
          <div className={"week"}>
            {currentCalendar.map((day, k) => (
              <div
                key={k}
                className={"day " + day.type}
                onClick={() => change(day.year, day.mon, day.date)}
              >
                {day.date}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
