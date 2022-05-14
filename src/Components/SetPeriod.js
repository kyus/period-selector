import React, {useEffect, useState} from "react";
import SelectBox from "./Common/SelectBox";
import Calendar from "./Common/Calendar";
import {hourEntry, minEntry} from "../config/conf";
import {useSelector, useDispatch} from "react-redux";
import {dateForm} from "../util/utils";
import {setPeriodDate} from "../redux/period";

const SetDateForm = ({title, date, type}) => {
  const [hour, setHour] = useState("오전 0시");
  const [min, setMin] = useState("0분");
  const dispatch = useDispatch();
  const period = useSelector(state => state.period);

  const init = () => {
    const h = date.getHours();
    const m = Math.floor(date.getMinutes() / 10) * 10;
    changeHour(h);
    changeMinute(m);
  }

  const changeCalendar = (y, m, d) => {
    const targetDate = new Date(date);
    targetDate.setFullYear(y);
    targetDate.setMonth(m);
    targetDate.setDate(d);
    dispatch(setPeriodDate(type, targetDate));
  };

  const changeHour = (time) => {
    try {
      const hourStr = hourEntry.find((v) => v.value === time).name;
      setHour(hourStr);
      date.setHours(time);
      dispatch(setPeriodDate(type, date));
    } catch (e) {
      console.log(e);
    }
  };
  const changeMinute = (time) => {
    try {
      const minuteStr = minEntry.find((v) => v.value === time).name;
      setMin(minuteStr);
      date.setMinutes(time);
      dispatch(setPeriodDate(type, date));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(init, []);

  return (
    <>
      <div className={"popup-sub-title"}>{title}</div>
      <div className={"select-group"}>
        <SelectBox
          activeTitle={dateForm(date, 'Y년 m월 d일')}
          entry={<Calendar date={date} change={changeCalendar} />}
          minWidth={250}
        />
        <SelectBox activeTitle={hour} entry={hourEntry} change={changeHour}/>
        <SelectBox activeTitle={min} entry={minEntry} change={changeMinute}/>
      </div>
    </>
  );
};

export default function SetPeriod() {
  const period = useSelector(state => state.period);
  const startDate = period.startTmpDate ? period.startTmpDate : new Date();
  const endDate = period.endTmpDate ? period.endTmpDate : new Date();
  const dispatch = useDispatch();

  const init = () => {
    dispatch(setPeriodDate('startTmpDate', startDate));
    dispatch(setPeriodDate('endTmpDate', endDate));
  }



  useEffect(init, []);

  return (
    <>
      <SetDateForm
        title={"응시 시작일"}
        date={startDate}
        type={"startTmpDate"}
      />
      <div className={"divide-line"}/>
      <SetDateForm title={"응시 마감일"} date={endDate} type={"endTmpDate"}/>
    </>
  );
}
