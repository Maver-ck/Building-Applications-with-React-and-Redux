import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

//function components with hooks are easier to declare and maintain over classes
function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  // useState hook allows us to add React state to function components
  // initialise course state to a copy of the value passed in on props
  // NOTE: using react state rather than Redux -
  // Avoid using Redux for all state.  Use plain React state for local form state and Redux for global values
  // this happens once - when the component is mounted but it means ...props.course is initial value => problem, no data available here due to async transactions
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

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
    } else {
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    // destructure avoids the event getting garbage collected so it's available within the nested setCourse callback
    const { name, value } = event.target;
    // functional form of set state so you can reference previous state as you set new state
    setCourse(prevCourse => ({
      // JS computed property syntax - allows us to reference a property via a variable
      // events returns numbers as strings so we need to convert authorId to an int here
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course Saved");
        history.push("/courses"); //after the save is done, use react router's history to change url to the courses page.  (could have used Redirect also)
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  // function component doesn't need "render()" any more as it's implied
  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

// we expect dispatch to be passed into the component and it will be as connect auto passes in here
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

// determines what state is passed to our component via props
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
