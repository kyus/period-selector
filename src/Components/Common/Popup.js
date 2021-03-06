import React from "react";
import {setOpenedSelectBox} from "../../redux/openedSelectBox";
import {useDispatch} from "react-redux";

export default function Popup({title, body, close, confirm}) {
  const dispatch = useDispatch();
  const popupWindowClick = (event) => {
    event.stopPropagation();
    dispatch(setOpenedSelectBox(null));
  }
  return (
    <div className={"popup-bg"} onClick={close}>
      <div
        className={"popup-window"}
        onClick={popupWindowClick}
      >
        <div className={"content-wrapper"}>
          <div className={"popup-title"}>{title}</div>
          <div className={"body"}>{body}</div>
        </div>
        <div className={"btn-wrapper right"}>
          <div className={"btn"} onClick={close}>
            취소
          </div>
          <div className={"btn"} onClick={confirm}>
            확인
          </div>
        </div>
      </div>
    </div>
  );
}
