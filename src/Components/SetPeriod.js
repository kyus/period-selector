import React, {useCallback, useEffect, useState} from "react";
import SelectBox from "./Common/SelectBox";
import Calendar from "./Common/Calendar";
import {hourEntry, minEntry} from "../config/conf";
import {useSelector, useDispatch} from "react-redux";
import {dateForm} from "../util/utils";
import {setPeriodDate} from "../redux/period";

const SetDateForm = ({title, dateTitle, date, type}) => {
  const [hour, setHour] = useState("오전 0시");
  const [min, setMin] = useState("0분");
  const [range, setRange] = useState({st: false, ed: false});
  const dispatch = useDispatch();
  const period = useSelector(state => state.period);

  const init = () => {
    const h = date.getHours();
    const m = Math.floor(date.getMinutes() / 10) * 10;
    changeHour(h);
    changeMinute(m);
  }

  const checkOutOfRange = (d) => {
    const targetTime = d.getTime();
    const {st} = range;
    const stTime = new Date(st.y, st.m, st.d).getTime();
    if (targetTime < stTime) {
      return true;
    }
    if (!period.endTmpDate) {
      return false;
    }
    if (targetTime > period.endTmpDate.getTime() || targetTime < period.startTmpDate.getTime()) {
      return true;
    }
    return false;
  }

  const changeCalendar = (y, m, d) => {
    const targetDate = new Date(date);
    targetDate.setFullYear(y);
    targetDate.setMonth(m);
    targetDate.setDate(d);
    if (checkOutOfRange(targetDate)) {
      targetDate.setHours(period.stHour);
      targetDate.setMinutes(period.stMinute);
      dispatch(setPeriodDate('startTmpDate', targetDate));
      dispatch(setPeriodDate('endTmpDate', false));
      return;
    }
    targetDate.setHours(period.edHour);
    targetDate.setMinutes(period.edMinute);
    dispatch(setPeriodDate('endTmpDate', targetDate));
  };

  const changeHour = (time) => {
    try {
      const hourStr = hourEntry.find((v) => v.value === time).name;
      const timeType = (type === "startTmpDate") ? "stH" : "edH";
      setHour(hourStr);
      date.setHours(time);
      dispatch(setPeriodDate(type, date));
      dispatch(setPeriodDate(timeType, time));
    } catch (e) {
      console.log(e);
    }
  };
  const changeMinute = (time) => {
    try {
      const minuteStr = minEntry.find((v) => v.value === time).name;
      const timeType = (type === "startTmpDate") ? "stM" : "edM";
      setMin(minuteStr);
      date.setMinutes(time);
      dispatch(setPeriodDate(type, date));
      dispatch(setPeriodDate(timeType, time));
    } catch (e) {
      console.log(e);
    }
  };

  const updateRange = useCallback(() => {
    if (!period.startTmpDate) {
      return;
    }
    const stY = period.startTmpDate.getFullYear();
    const stM = period.startTmpDate.getMonth();
    const stD = period.startTmpDate.getDate();
    const st = {y: stY, m: stM, d: stD};
    if (!period.endTmpDate) {
      setRange({st, ed: false});
      return;
    }
    const edY = period.endTmpDate.getFullYear();
    const edM = period.endTmpDate.getMonth();
    const edD = period.endTmpDate.getDate();
    const ed = {y: edY, m: edM, d: edD};
    setRange({st, ed});
  }, [period]);

  useEffect(init, []);
  useEffect(updateRange, [period]);

  return (
    <>
      <div className={"popup-sub-title"}>{title}</div>
      <div className={"select-group"}>
        <SelectBox
          activeTitle={dateTitle}
          entry={<Calendar date={date} change={changeCalendar} st={range.st} ed={range.ed} />}
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
        dateTitle={period.startTmpDate ? dateForm(startDate, 'Y년 m월 d일') : '시작일을 선택하세요.'}
        date={startDate}
        type={"startTmpDate"}
      />
      <div className={"divide-line"}/>
      <SetDateForm
        title={"응시 마감일"}
        dateTitle={period.endTmpDate ? dateForm(endDate, 'Y년 m월 d일') : '마감일을 선택하세요.'}
        date={endDate}
        type={"endTmpDate"}
      />
    </>
  );
}
