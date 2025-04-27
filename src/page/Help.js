import React from 'react';
import Cardd from './CardMain';


export default function Help({ helpProjects }) {
  const helpProjectss = helpProjects.filter(card => card.class_id === 1);
  return (
    <div>

      {Array.isArray(helpProjectss) && helpProjectss.length > 0 ? (
        <Cardd helpProjectss={helpProjectss} />
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
}
