import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

//function components with hooks are easier to declare and maintain over classes
function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  ...props
}) {
  // useState hook allows us to add React state to function components
  // initialise course state to a copy of the value passed in on props
  // NOTE: using react state rather than Redux -
  // Avoid using Redux for all state.  Use plain React state for local form state and Redux for global values
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  // hook lets us handle side effects
  // this effect will run every time the component renders
  // we want this to run once when the component mounts => we can declare a second argument to useEffect
  // second argument is an array  of items to watch, if anything in the array changes the effect will be rerun
  // since we only want it to run once we declare an empty array => this is effectively the same as componentDidMount
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, []);

  // function component doesn't need "render()" any more as it's implied
  return (
    <>
      <CourseForm course={course} errors={errors} authors={authors} />
    </>
  );
}

// we expect dispatch to be passed into the component and it will be as connect auto passes in here
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

// determines what state is passed to our component via props
function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);