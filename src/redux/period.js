const SET_START_DATE = "PERIOD/SET_START_DATE";
const SET_END_DATE = "PERIOD/SET_END_DATE";
const SET_START_TMP_DATE = "PERIOD/SET_START_TMP_DATE";
const SET_END_TMP_DATE = "PERIOD/SET_END_TMP_DATE";
const SET_START_HOUR = "PERIOD/SET_START_HOUR";
const SET_START_MINUTE = "PERIOD/SET_START_MINUTE";
const SET_END_HOUR = "PERIOD/SET_END_HOUR";
const SET_END_MINUTE = "PERIOD/SET_END_MINUTE";

const _getType = (type) => {
    switch (type) {
        case "startDate":
            return SET_START_DATE;
        case "startTmpDate":
            return SET_START_TMP_DATE;
        case "endDate":
            return SET_END_DATE;
        case "endTmpDate":
            return SET_END_TMP_DATE;
        case "stH":
            return SET_START_HOUR;
        case "stM":
            return SET_START_MINUTE;
        case "edH":
            return SET_END_HOUR;
        case "edM":
            return SET_END_MINUTE;
        default:
            return "";
    }
};
export const setPeriodDate = (type, date) => ({ type: _getType(type), date });

const initialState = {
    startDate: false,
    endDate: false,
    startTmpDate: false,
    endTmpDate: false,
    stHour: 0,
    stMinute: 0,
    edHour: 0,
    edMinute: 0,
};

const period = (state = initialState, action) => {
    switch (action.type) {
        case SET_START_DATE:
            return { ...state, startDate: action.date };
        case SET_START_TMP_DATE:
            return { ...state, startTmpDate: action.date };
        case SET_END_DATE:
            return { ...state, endDate: action.date };
        case SET_END_TMP_DATE:
            return { ...state, endTmpDate: action.date };
        case SET_START_HOUR:
            return { ...state, stHour: action.date };
        case SET_START_MINUTE:
            return { ...state, stMinute: action.date };
        case SET_END_HOUR:
            return { ...state, edHour: action.date };
        case SET_END_MINUTE:
            return { ...state, edMinute: action.date };
        default:
            return state;
    }
};

export default period;
