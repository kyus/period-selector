import "./App.scss";
import {useCallback, useState} from "react";
import Popup from "./Components/Common/Popup";
import SetPeriod from "./Components/SetPeriod";

function App() {
  const [popup, setPopup] = useState(false);

  const togglePopup = useCallback(() => {
    setPopup(!popup);
  }, [popup]);

  return (
    <div className={"App"}>
      <button className={"btn"} onClick={togglePopup}>
        응시기간 설정 대화상자 열기
      </button>
      {popup && (
        <Popup
          title={"응시 기간 설정"}
          body={<SetPeriod/>}
          close={togglePopup}
          confirm={togglePopup}
        />
      )}
    </div>
  );
}

export default App;
