export const SET_START_DATE = "PERIOD/SET_START_DATE";
export const SET_END_DATE = "PERIOD/SET_END_DATE";
export const SET_START_TMP_DATE = "PERIOD/SET_START_TMP_DATE";
export const SET_END_TMP_DATE = "PERIOD/SET_END_TMP_DATE";

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
        default:
            return state;
    }
};

export default period;
