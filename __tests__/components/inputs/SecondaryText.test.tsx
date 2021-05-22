import React from "react";
import renderer from "react-test-renderer";
import { PrimaryText } from "../../../components/inputs/PrimaryText";
import { SecondaryText } from "../../../components/inputs/SecondaryText";

const props = {
  children: "some secondary text",
  style: {},
  numberofLines: 2
};

test("renders correctly", () => {
  const tree = renderer.create(<SecondaryText {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
