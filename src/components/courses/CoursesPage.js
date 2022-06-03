import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Spinner from "../common/Spinner";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };
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
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? ( //If loading is true, render the spinner,
          <Spinner />
        ) : (
          <>
            {" "}
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList courses={this.props.courses}> </CourseList>
            <input type="submit" value="Save" />
          </>
        )}
      </>
    );
  }
}

//This is to clarified that we expect dispatch to be passed into de CoursesPage component and it will be passed in because connect automatically passes dispatch in if we omit that second argunment
CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired, //Only the actions we declared in mapDispatchToProps are passed in
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  //list of courses available on this.props.courses

  return {
    //courses on props
    courses:
      state.authors.length === 0 //if we dont have any author data yet
        ? [] //return an empty array
        : state.courses.map((course) => {
            //if we do have data, map over that array of courses
            return {
              ...course, //enhance that array that will have a extra property called authorName
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0, //Is the initial state , bc the app is loading if at least one API call is in progress
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

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); //Connect function connects our components to REdux, takes 2 parameters. Then we take the result of this and call CoursesPage
//When we omit mapDispatchProps, our component gets a dispatch prop injected automatically.
