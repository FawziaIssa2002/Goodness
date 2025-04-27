import React from 'react';
import Cardd from './CardMain';
import Actions from './Actions';
import Others from './Others';


export default function Help({ othersProjects }) {
  const othersProjects = othersProjects.filter(card => card.class_id === 4);
  return (
    <div>
 { console.log("Help "+ othersProjects)}

      {Array.isArray(othersProjects) && othersProjects.length > 0 ? (
        <Others othersProjects={othersProjects} />
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
}
