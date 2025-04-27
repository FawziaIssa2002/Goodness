import React from 'react';
import Cardd from './CardMain';
import Actions from './Actions';


export default function Help({ actionsProjects }) {
  const actionsProjects = actionsProjects.filter(card => card.class_id === 4);
  return (
    <div>
 { console.log("Help "+ actionsProjects)}

      {Array.isArray(actionsProjects) && actionsProjects.length > 0 ? (
        <Actions actionsProjects={actionsProjects} />
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
}
