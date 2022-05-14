import "./App.scss";
import {useCallback, useState} from "react";
import Popup from "./Components/Common/Popup";
import SetPeriod from "./Components/SetPeriod";
import {useSelector, useDispatch} from "react-redux";
import {dateForm} from "./util/utils";
import {setPeriodDate} from "./redux/period";

function App() {
  const [popup, setPopup] = useState(false);
  const period = useSelector(state => state.period);
  const dispatch = useDispatch();

  const togglePopup = useCallback(() => {
    setPopup(!popup);
  }, [popup]);

  const cancel = () => {
    try {
      const {startDate, endDate} = period;
      const st = startDate ? new Date(startDate) : false;
      const ed = endDate ? new Date(endDate) : false;
      dispatch(setPeriodDate('startTmpDate', st));
      dispatch(setPeriodDate('endTmpDate', ed));
    } catch(e) {
      alert('error');
      console.log('tmpDate restore Error', e);
    }
    togglePopup();
  }

  const confirm = () => {
    const {startTmpDate, endTmpDate} = period;
    if (!endTmpDate) {
      alert('마감일을 선택하세요.');
      return false;
    }
    if (startTmpDate.getTime() > endTmpDate.getTime()) {
      alert('마감일은 시작일 이후로 설정해야 합니다.');
      return false;
    }
    dispatch(setPeriodDate('startDate', new Date(startTmpDate)));
    dispatch(setPeriodDate('endDate', new Date(endTmpDate)));
    togglePopup();
  };


  return (
    <div className={"App"}>
      <div className={"info"}>
        <div>응시 시작일 : {period.startDate ? dateForm(period.startDate, 'Y년 m월 d일 H시 i분') : '미설정'}</div>
        <div>응시 마감일 : {period.endDate ? dateForm(period.endDate, 'Y년 m월 d일 H시 i분') : '미설정'}</div>
      </div>
      <button className={"btn"} onClick={togglePopup}>
        응시기간 설정 대화상자 열기
      </button>
      {popup && (
        <Popup
          title={"응시 기간 설정"}
          body={<SetPeriod/>}
          close={cancel}
          confirm={confirm}
        />
      )}
    </div>
  );
}

export default App;
