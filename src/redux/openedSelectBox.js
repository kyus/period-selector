const SET_OPENED_SELECT_BOX = "OPENED_SELECT_BOX/SET_OPENED_SELECT_BOX";

const initialState = null;

export const setOpenedSelectBox = (ref) => ({type: SET_OPENED_SELECT_BOX, ref });

const openedSelectBox = (state = initialState, action) => {
  switch(action.type) {
    case SET_OPENED_SELECT_BOX :
      return action.ref;
    default:
      return state;
  }
}

export default openedSelectBox;
