import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  ...props
}) {
  //...props says "Assign any props I havent destructured on the left to a variable called props."

  //NewCourse Form needs state to hold the form field values before they're saved, so, need set up some local state (useState Hook    )
  // useState returtn a pair of values. We use array destructuring syntax to  assing each value a name.
  //First value is the state variable, an the second value is the setter function fot that variable.
  //useState accepts a default argument, we're specifyng that it should initialize ur course state variable to a copy of the course passed in on props

  const [course, setCourse] = useState({ ...props.course }); //course that is passed in on props
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses fail" + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors fail" + error);
      });
    }
  }, []);
  //The convention in COurseFormPage (name and value) will allows to update the corresponding property in state with a single change handler.
  //function handleChange will accept an event, then destructuring of that event , then call setCourse, and use the functional form of setState

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      //You can pass either an object or a function to setState
      [name]: name === "authorId" ? parseInt(value, 10) : value, //JS's computed property syntax. It allows us to reference a property via a variable.We need to handle the author ID as a number, so ParseIn to convert that value to a number
    }));
  }

  return (
    <>
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
      />
    </>
  );
}

//This is to clarified that we expect dispatch to be passed into de ManageCoursePage component and it will be passed in because connect automatically passes dispatch in if we omit that second argunment
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired, //Only the actions we declared in mapDispatchToProps are passed in
  loadCourses: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  //list of courses available on this.props.courses

  return {
    //courses on props
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}
const mapDispatchToProps = {
  //list of courses available on this.props.courses
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage); //Connect function connects our components to REdux, takes 2 parameters. Then we take the result of this and call ManageCoursePage
//When we omit mapDispatchProps, our component gets a dispatch prop injected automatically.
