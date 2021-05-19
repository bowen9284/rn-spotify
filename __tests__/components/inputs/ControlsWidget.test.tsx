import React from "react";
import renderer from "react-test-renderer";
import ControlsWidget from "../../../components/inputs/ControlsWidget";


const props = {
  description: 'Description about the playlist',
  isFollowed: true,
  ownerDisplayName: "Spotify",
  ownerImages: [{
    width: 640,
    height: 640,
    url: 'someUrl' 
  }],
  numOfLikes: 200000,
  totalDuration: 415262,
  onFollowPress: jest.fn(),
  onDownloadPress: jest.fn(),
  onEllipsisPress: jest.fn()
};

test("renders correctly", () => {
  const tree = renderer.create(<ControlsWidget {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
