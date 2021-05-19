import React from "react";
import renderer from "react-test-renderer";
import { PrimaryText } from "../../../components/inputs/PrimaryText";

const props = {
  children: "some primary text",
  style: {}
};

test("renders correctly", () => {
  const tree = renderer.create(<PrimaryText {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
