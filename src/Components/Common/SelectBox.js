import React, {useCallback, useEffect, useRef, useState} from "react";

const Entry = ({entry, change}) => {
    const ref = useRef(null);
    const [style, setStyle] = useState({});
    const [type, setType] = useState("");

    const initType = () => {
        if (!entry) return false;
        const type = Array.isArray(entry) ? "array" : "component";
        setType(type);
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
};

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
    const toggle = useCallback(() => {
        setActive(!active);
    }, [active]);

    return (<div
            className={"select-box " + (active ? "active" : "")}
            onClick={toggle}
            style={{width, height, minWidth, minHeight}}
        >
            <div className={"select-title"}>
                <div>{activeTitle}</div>
                <div className={"icon select-icon"}/>
            </div>
            {active && <Entry entry={entry} change={change}/>}
        </div>);
}
