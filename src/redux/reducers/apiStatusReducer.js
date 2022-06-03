import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress, //Calling the initial state , that accepts an action
  action
) {
  if (action.type == types.BEGIIN_API_CALL) {
    //if instead switch
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }
  return state;
}

//WHEN create a new reducer, you need to reference it in the root reducer!!!
