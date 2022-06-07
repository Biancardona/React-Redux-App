import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  //...props says "Assign any props I havent destructured on the left to a variable called props."

  //NewCourse Form needs state to hold the form field values before they're saved, so, need set up some local state (useState Hook    )
  // useState returtn a pair of values. We use array destructuring syntax to  assing each value a name.
  //First value is the state variable, an the second value is the setter function fot that variable.
  //useState accepts a default argument, we're specifyng that it should initialize ur course state variable to a copy of the course passed in on props

  const [course, setCourse] = useState({ ...props.course }); //course that is passed in on props
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses fail" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors fail" + error);
      });
    }
  }, [props.course]);
  //The convention in COurseFormPage (name and value) will allows to update the corresponding property in state with a single change handler.
  //function handleChange will accept an event, then destructuring of that event , then call setCourse, and use the functional form of setState

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      //You can pass either an object or a function to setState
      [name]: name === "authorId" ? parseInt(value, 10) : value, //JS's computed property syntax. It allows us to reference a property via a variable.We need to handle the author ID as a number, so ParseIn to convert that value to a number
    }));
  }
  function formIsValid() {
    const { title, authorId, category } = course; //Destructuring at the top to shorten the calls below
    const errors = {}; //empty errors object  and if and error is found =
    if (!title) errors.title = "Title is required"; //set a property on each errors object that corresponds to the fields property in state
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors); //passing the errors objects
    //Form is valid is the errors object still has no properties
    return Object.keys(errors).length === 0; //object.keys returns an array of objects properties so if there no properties on the object, then no errors where found
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        // This is passed in on props, so it's already bound to dispatch  => ({
        toast.success("Course Saved");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      }); //setSaving to false bc we're going to stay on this page if an error occurs. This way the user try submittin the form again after an error occurs
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
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
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, //any component that's loaded via React Router route gets the history object passed in automatically
};

export function getCourseBySlug(courses, slug) {
  //This is a selector. It selects data from the Redux store.
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  //ownProps lets us access the component's props
  //list of courses available on this.props.courses
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    //courses on props
    course,
    courses: state.courses,
    authors: state.authors,
  };
}
const mapDispatchToProps = {
  //list of courses available on this.props.courses (object style)
  loadCourses,
  loadAuthors,
  saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage); //Connect function connects our components to REdux, takes 2 parameters. Then we take the result of this and call ManageCoursePage
//When we omit mapDispatchProps, our component gets a dispatch prop injected automatically.
