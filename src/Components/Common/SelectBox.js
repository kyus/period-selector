import React, {forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setOpenedSelectBox} from "../../redux/openedSelectBox";

const Entry = forwardRef(({entry, change}, ref) => {
  const [style, setStyle] = useState({});
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const initType = () => {
    if (!entry) return false;
    const type = Array.isArray(entry) ? "array" : "component";
    setType(type);
    dispatch(setOpenedSelectBox(ref));
  };

  const setEntryPosition = () => {
    try {
      const browserHeight = window.innerHeight;
      const {parentElement} = ref.current;
      const parentHeight = parentElement.clientHeight;
      const DomObj = ref.current.getBoundingClientRect();
      const entryBottomPos = DomObj.top + DomObj.height;
      if (browserHeight < entryBottomPos) {
        setStyle({bottom: parentHeight + 20});
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(initType, []);
  useEffect(setEntryPosition, [type]);

  return (<div className={"entry " + type} ref={ref} style={style}>
    {type === "array" && entry.map((v, k) => (<div key={k} className={"item"} onClick={() => change(v.value)}>
      {v.name}
    </div>))}
    {type === "component" && entry}
  </div>);
});

export default function SelectBox(
  {
    activeTitle,
    entry,
    change,
    minWidth,
    minHeight,
    width,
    height
  }
) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const openedSelectBox = useSelector(state => state.openedSelectBox);

  const toggle = useCallback((event) => {
    setActive(!active);
    event.stopPropagation();
  }, [active]);

  useEffect(() => {
    if (ref !== openedSelectBox) {
      setActive(false);
    }
  }, [openedSelectBox]);

  return (<div
    className={"select-box " + (active ? "active" : "")}
    onClick={toggle}
    style={{width, height, minWidth, minHeight}}
  >
    <div className={"select-title"}>
      <div>{activeTitle}</div>
      <div className={"icon select-icon"}/>
    </div>
    {active && <Entry entry={entry} change={change} ref={ref} />}
  </div>);
}
