import React from 'react';
import '../App.css';
import DataEazy from './DataEazy';


export default function Easy({ EasyProjects, role }){
  const EasyProjectss = EasyProjects.filter(card => card.class_id === 2);
  // const EasyProjectss = EasyProjects.filter(card => card.class_id === 1);
  // const EasyProjectss = EasyProjects.filter(card => card.class_id === 2);
  

  
return(
    <div>
      {/* {console.log("easy "+role)} */}
      <DataEazy EasyProjectss={EasyProjectss} role={role}/>
    </div>
);
}
// export default Easy;


