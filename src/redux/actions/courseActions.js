import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}

export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function loadCourses() {
  // note we don't have to pass dispatch to loadCourses - this is the benefit of redux-thunk
  return function(dispatch) {
    return courseApi.getCourses().then(courses => {
      dispatch(loadCourseSuccess(courses));
    });
  };
}
