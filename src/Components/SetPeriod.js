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

  const checkOutOfRange = useCallback((d) => {
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
  }, [period, range]);

  const changeCalendar = useCallback((y, m, d) => {
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
  }, [
    checkOutOfRange,
    date,
    dispatch,
    period
  ]);

  const changeHour = useCallback((time) => {
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
  }, [date, dispatch, type]);
  const changeMinute = useCallback((time) => {
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
  }, [date, dispatch, type]);

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

  const init = useCallback(() => {
    if (date) {
      const h = date.getHours();
      const m = Math.floor(date.getMinutes() / 10) * 10;
      changeHour(h);
      changeMinute(m);
    }
  }, [changeHour, changeMinute, date]);

  useEffect(init, [init]);
  useEffect(updateRange, [updateRange]);

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
  const [isInit, setInitFlag] = useState(false);
  const period = useSelector(state => state.period);
  const dispatch = useDispatch();

  const init = useCallback(() => {
    if (!isInit) {
      if (!period.startTmpDate || !period.endTmpDate) {
        dispatch(setPeriodDate('startTmpDate', new Date()));
        dispatch(setPeriodDate('endTmpDate', new Date()));
      }
      setInitFlag(true);
    }
  }, [dispatch, period, isInit]);

  useEffect(init, [init]);

  if (!isInit) return null;
  return (
    <>
      <SetDateForm
        title={"응시 시작일"}
        dateTitle={period.startTmpDate ? dateForm(period.startTmpDate, 'Y년 m월 d일') : '시작일을 선택하세요.'}
        date={period.startTmpDate}
        type={"startTmpDate"}
      />
      <div className={"divide-line"}/>
      <SetDateForm
        title={"응시 마감일"}
        dateTitle={period.endTmpDate ? dateForm(period.endTmpDate, 'Y년 m월 d일') : '마감일을 선택하세요.'}
        date={period.endTmpDate}
        type={"endTmpDate"}
      />
    </>
  );
}
