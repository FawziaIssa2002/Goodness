import { useEffect, useState } from "react"
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";
import { PRO, Pro } from "../../Api/Api";

export default function Projects(){
  //States
   const [projects , setProjects] = useState([]);
  //  console.log(projects);

   //Get All Categories
    useEffect(() =>{  
        Axios.get(`/projects`)
        // ${PRO}
        .then((data) => setProjects(data.data.data))
        .catch((err) => console.log(err));
     },[]);

     const header = [
        {
        key: "name",
        name: "اسم المشروع"
        },
        {
         key: "description",
         name: "وصف عن المشروع"
        },
        {
        key: "total_budget",
        name: "الميزانية الكلية", 
        },
        {
        key: "target",
        name: "الجهة المستهدفة",
        },
        {
          key: "tag",
          name: "التاغ",
          },
    ];
    
    //Handle Delete
    async function handleDelete(id){
      try{
        const res = await Axios.post(`/project/${id}`); 
        // ${Pro}
        setProjects((prev) => prev.filter((item) => item.id !== id));
      }catch(err){
        // console.log(err);
      }
    }
 
 
 
     //if axios is not found .. the server will give me error 500
     //so we will use axios instead of fetch ..and will delete the json
     // because axios do json internal and will write catch to catch error
     // if we run code now will give error unuthorization because he need data
     //so dont forgive to put auth by headers and bring token
    
   return (
     <div className="bg-white w-100 p-2">
       <div className="d-flex align-items-center justify-content-between">
         <h1 className="title-table">مشاريع الجمعية</h1>
         <Link className="btn btn-primary" to="/dashboard/project/add">
          إضافة مشروع جديد
         </Link>
       </div>
        <TableShow header={header} data={projects} delete={handleDelete}/>
     </div>
   );
}