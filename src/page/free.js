import React from 'react';
import DataFree from './DataFree';
export default function Free({FreeProjects}) {
  return(
    <div>
      {Array.isArray(FreeProjects) && FreeProjects.length > 0 ? (
        <DataFree FreeProjects={FreeProjects} />
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
    
}