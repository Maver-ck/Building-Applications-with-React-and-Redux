import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
class CoursesPage extends React.Component {
  // class field
  state = {
    course: {
      title: ""
    }
  };

  // "this" inside arrow function references a class instance
  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = event => {
    // preventDefailt required as the form reloads otherwise and doesn't create the alert
    event.preventDefault();
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      //this is added here on the form as it'll sumit when you click the enter key
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
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
