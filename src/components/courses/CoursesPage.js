import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

// const CoursesPage = () => (
//   <div>
//     <h2>Courses</h2>
//     <p>React, Redux and React Router for ultra-responsive web apps.</p>
//   </div>
// );

// export default CoursesPage;

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch((error) => {
      alert("Loading courses fail" + error);
    });
  }
  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses}> </CourseList>

        <input type="submit" value="Save" />
      </>
    );
  }
}

//This is to clarified that we expect dispatch to be passed into de CoursesPage component and it will be passed in because connect automatically passes dispatch in if we omit that second argunment
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired, //Only the actions we declared in mapDispatchToProps are passed in
};

function mapStateToProps(state) {
  //list of courses available on this.props.courses

  return {
    courses: state.courses,
  };
}
function mapDispatchToProps(dispatch) {
  //list of courses available on this.props.courses
  return {
    actions: bindActionCreators(courseActions, dispatch), //bindAction.. returns an object mimicking the original object, but with each function wrapped in a call to dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); //Connect function connects our components to REdux, takes 2 parameters. Then we take the result of this and call CoursesPage
//When we omit mapDispatchProps, our component gets a dispatch prop injected automatically.
