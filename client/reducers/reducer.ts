import { PayloadAction } from "@reduxjs/toolkit";
import { Action } from "redux";

const initialState = {
  data: [],
};

function reducer(state = initialState, action:PayloadAction) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;