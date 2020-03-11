import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

//function components with hooks are easier to declare and maintain over classes
function ManageCoursePage({ courses, authors, loadAuthors, loadCourses }) {
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
      <h2>Manage Course</h2>
    </>
  );
}

// we expect dispatch to be passed into the component and it will be as connect auto passes in here
ManageCoursePage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

// determines what state is passed to our component via props
function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
