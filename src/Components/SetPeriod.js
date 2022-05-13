import React, { useState } from "react";
import SelectBox from "./Common/SelectBox";
import Calendar from "./Common/Calendar";
import { hourEntry, minEntry } from "../config/conf";

const SetDateForm = ({ title, date, type }) => {
    const [hour, setHour] = useState("오전 0시");
    const [min, setMin] = useState("0분");

    const changeHour = (time) => {
        try {
            const hourStr = hourEntry.find((v) => v.value === time).name;
            setHour(hourStr);
        } catch (e) {
            console.log(e);
        }
    };
    const changeMinute = (time) => {
        try {
            const minuteStr = minEntry.find((v) => v.value === time).name;
            setMin(minuteStr);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className={"popup-sub-title"}>{title}</div>
            <div className={"select-group"}>
                <SelectBox
                    activeTitle={date}
                    entry={<Calendar type={type} />}
                    minWidth={250}
                />
                <SelectBox activeTitle={hour} entry={hourEntry} change={changeHour} />
                <SelectBox activeTitle={min} entry={minEntry} change={changeMinute} />
            </div>
        </>
    );
};

export default function SetPeriod() {
    const startDate = '';
    const endDate = '';
    return (
        <>
            <SetDateForm
                title={"응시 시작일"}
                date={startDate}
                type={"startTmpDate"}
            />
            <div className={"divide-line"} />
            <SetDateForm title={"응시 마감일"} date={endDate} type={"endTmpDate"} />
        </>
    );
}
