import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
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
    // connect function auto adds dispatch as a prop function
    // we're dispatching the createCourse action and passing it to the course
    // we HAVE to dispatch an action - if you just call an action creator it wont do anything
    // action creators just return an object
    this.props.dispatch(courseActions.createCourse(this.state.course));
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
      </form>
    );
  }
}

// we expect dispatch to be passed into the component and it will be as connect auto passes in here
CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// determines what state is passed to our component via props
function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

// we omitted mapDispatchToProps => our component gets a dispatch prop injected automatically
export default connect(mapStateToProps)(CoursesPage);
