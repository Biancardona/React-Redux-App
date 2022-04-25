import * as types from "../actions/actionTypes";

export default function courseReducer(state = [], action) {
  //Initializying state to an empty array because this will end up storying and array of courses
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.course }]; //This will update our Redux sotre by adddint the new action passed in the action.course
    case types.LOAD_COURSES_SUCCESS:
      return action.courses; //This action will update the state with the new course added
    default:
      return state; //If some other action is dispatched that thisparticular reducer doesn't care about, it shoul just return the unchanged state
  }
}
