export const CREATE_COURSE = "CREATE_COURSE";
export const LOAD_COURSES_SUCCESS = "LOAD_COURSES_SUCCESS";
export const LOAD_AUTHORS_SUCCESS = "LOAD_AUTHORS_SUCCESS";
export const CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCESS";
export const UPDATE_COURSE_SUCCESS = "UPDATE_COURSE_SUCCESS";
export const BEGIIN_API_CALL = "BEGIIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";
//Create the action in redux/actions folder, then initialize the state, then the reducer.

//By convention, action that end in "_SUCCESS" are assumed to have been the result of a completed
//API call. But since we´re doing an optimistic delete, we're hiding loading state.
//So this action name deliberately omits the "_SUCEESS" suffix.
//If it had one, our apiCallsInProgress counter would be decremented below zero
//because we're not incrementig the number of apiCallInProgress when the delete request begins.
export const DELETE_COURSE_OPTIMISTIC = "DELETE_COURSE_OPTIMISTIC";
