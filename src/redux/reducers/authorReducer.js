import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorReducer(state = initialState.authors, action) {
  //Initializying state to an empty array because this will end up storying and array of courses
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state; //If some other action is dispatched that thisparticular reducer doesn't care about, it shoul just return the unchanged state
  }
}
