import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}

//success response courses when the app initially loads
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

//loading courses when the app initially loads
export function loadCourses() {
  return function (dispatch) {
    //Redux thunk injects dispatch so we dont have to
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) {
    //getState let us access the Redux store data
    //Redux thunk injects dispatch so we dont have to
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id //Looking at wheter a course ID exists it depends the next action: PUT or POST
          ? //if and course id exists, just update
            dispatch(updateCourseSuccess(savedCourse))
          : //otherwise, create
            dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}
