import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  //Initializying state to an empty array because this will end up storying and array of courses
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }]; //This will update our Redux sotre by adddint the new action passed in the action.course
    case types.UPDATE_COURSE_SUCCESS:
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      ); //map returns a new array. This replacing the element with the matching course.id
    case types.LOAD_COURSES_SUCCESS:
      return action.courses; //This action will update the state with the new course added
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.course.id); //return the array of courses but omit the one tha was deleted. Using a predicate (function that return true or false)
    default:
      return state; //If some other action is dispatched that thisparticular reducer doesn't care about, it shoul just return the unchanged state
  }
}
