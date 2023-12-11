import React from 'react';
import Blog from './shownews';
import AddNews from './addnews';

const blogmanager = () => {

  return (
    <div>
      <AddNews  />
      <Blog />
    </div>
  );
};

export default blogmanager;
