import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

// const ManageCoursePage = () => (
//   <div>
//     <h2>Courses</h2>
//     <p>React, Redux and React Router for ultra-responsive web apps.</p>
//   </div>
// );

// export default ManageCoursePage;

class ManageCoursePage extends React.Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses fail" + error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading authors fail" + error);
      });
    }
  }
  render() {
    return (
      <>
        <h2>Manage Course</h2>
      </>
    );
  }
}

//This is to clarified that we expect dispatch to be passed into de ManageCoursePage component and it will be passed in because connect automatically passes dispatch in if we omit that second argunment
ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired, //Only the actions we declared in mapDispatchToProps are passed in
};

function mapStateToProps(state) {
  //list of courses available on this.props.courses

  return {
    //courses on props
    courses: state.courses,
    authors: state.authors,
  };
}
function mapDispatchToProps(dispatch) {
  //list of courses available on this.props.courses
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch), //bindAction.. returns an object mimicking the original object, but with each function wrapped in a call to dispatch
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch), //bindAction.. returns an object mimicking the original object, but with each function wrapped in a call to dispatch
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage); //Connect function connects our components to REdux, takes 2 parameters. Then we take the result of this and call ManageCoursePage
//When we omit mapDispatchProps, our component gets a dispatch prop injected automatically.
