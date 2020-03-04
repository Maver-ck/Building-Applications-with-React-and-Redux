import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CouserList";

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch(error => {
      alert("Loading courses failed" + error);
    });
  }
  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

// we expect dispatch to be passed into the component and it will be as connect auto passes in here
CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

// determines what state is passed to our component via props
function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

// determines what actions are available on props in our component
function mapDispatchToProps(dispatch) {
  return {
    // bindActionCreators wraps courseActions in a dispatch - NOTE IT PASSES IN ALL OF THE ACTIONS
    actions: bindActionCreators(courseActions, dispatch)
  };
}

// we declare mapDispatchToProps so dispatch is no longer injected.
// Only the actions we declared in mapDispatchToProps are passed in
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
