import React from 'react';
import renderer from 'react-test-renderer';
import HorizontalScroller from '../../components/HorizontalScroller';

const props = {
  title: 'Title',
  items: [],
};

test('renders correctly', () => {
  const tree = renderer.create(<HorizontalScroller {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
