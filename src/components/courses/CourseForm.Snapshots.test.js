import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";

//Assure the label on the save button is properly set when we set the save button prop to true
it("sets submit button label 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />
  ); //tree is an object that represents the output of our React component
  //courseForm takes a number of different props
  //jest.fn creates an empty mock function
  //setting the saving prop. With Boolean props, the existence of the prop infers truth, so we don't have to explicity type equals.

  //write the assertion(is how tou declare expected behavior in your tests )
  expect(tree).toMatchSnapshot();
});

it("sets submit button label 'Save' when saving is false", () => {
  //sets the submit button label to Save when saving is false
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  );
  expect(tree).toMatchSnapshot();
});
