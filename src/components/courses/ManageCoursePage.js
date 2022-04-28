import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

function ManageCoursePage({ courses, authors, loadAuthors, loadCourses }) {
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

  return (
    <>
      <h2>Manage Course</h2>
    </>
  );
}

//This is to clarified that we expect dispatch to be passed into de ManageCoursePage component and it will be passed in because connect automatically passes dispatch in if we omit that second argunment
ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired, //Only the actions we declared in mapDispatchToProps are passed in
  loadCourses: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  //list of courses available on this.props.courses

  return {
    //courses on props
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
