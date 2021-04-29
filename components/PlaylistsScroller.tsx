import React from 'react';
import HorizontalScroller from './HorizontalScroller';
import RecentListenSquareTile from './RecentListenSquareTile';

type Props = {
  title: string;
  items: [PlaylistsItem];
};

const PlaylistScroller: React.FC<Props> = ({ title, items }) => {
  let tiles = items?.map((item, index) => {
    return (
      <RecentListenSquareTile
        key={index}
        id={item.id}
        images={item.images}
        name={item.name}
      />
    );
  });

  return <HorizontalScroller title={title} children={tiles} />;
};

export default PlaylistScroller;
