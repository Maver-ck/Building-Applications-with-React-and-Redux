import React from "react";

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
    alert(this.state.course.title);
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

export default CoursesPage;
