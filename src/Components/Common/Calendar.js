import React, {useCallback, useEffect, useMemo, useState} from "react";
import {dayDefault, dummyCalendar} from "../../config/conf";

export default function Calendar({date, change, st, ed}) {
  const today = useMemo(() => new Date(), []);
  const dayStrArray = dayDefault;
  const [isInit, setInitFlag] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentCalendar, setCurrentCalendar] = useState(dummyCalendar);

  const init = useCallback(() => {
    if (!isInit) {
      const currentMonth = date ? date.getMonth() : today.getMonth();
      const currentYear = date ? date.getFullYear() : today.getFullYear();
      setCurrentMonth(currentMonth);
      setCurrentYear(currentYear);
      setInitFlag(true);
    }
  }, [date, today, isInit]);

  const setCalendarData = useCallback(() => {

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

  const isSelected = useCallback((y, m, d) => {
    try {
      if (!st) {
        return '';
      }
      const currentTime = new Date(y, m, d).getTime();
      const stTime = new Date(st.y, st.m, st.d).getTime();
      if (!ed) {
        return (currentTime === stTime) ? ' active' : '';
      }
      const edTime = new Date(ed.y, ed.m, ed.d).getTime();
      return (currentTime >= stTime && currentTime <= edTime) ? ' active' : '';
    } catch(e) {
      console.log('calendar selected Error', e);
    }
  }, [st, ed]);

  useEffect(init, [init]);
  useEffect(setCalendarData, [setCalendarData]);


  return (
    <div className={"calendar-wrapper"} onClick={(e) => e.stopPropagation()}>
      <div className={"calendar-header"}>
        <div className={"calendar-title"}>{`${currentYear}년 ${currentMonth + 1}월`}</div>
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
                className={"day " + day.type + isSelected(day.year, day.mon, day.date)}
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
