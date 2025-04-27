import { CAT, Cat } from "../../Api/Api";
import { useEffect, useState } from "react"
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";

export default function Categories(){
  //States
   const [categories , setCategories] = useState([]);
  //  console.log(categories);

   //Get All Categories
    useEffect(() =>{  
        Axios.get(`/classes`)
        // ${CAT}
        .then((data) => setCategories(data.data.data))
        .catch((err) => console.log(err));
     },[]);

     const header = [
        {
        key: "name",
        name: "اسم الصنف", 
        },
        {
        key: "image",
        name: "صورة الصنف",
        },
    ];
    
    //Handle Delete
    async function handleDelete(id){
      try{
        const res = await Axios.post(`/class/${id}`);
        // ${Cat} 
        setCategories((prev) => prev.filter((item) => item.id !== id));
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
         <h1>أصناف التبرعات</h1>
         <Link className="btn btn-primary" to="/dashboard/category/add">
           إضافة صنف جديد
         </Link>
       </div>
        <TableShow header={header} data={categories} delete={handleDelete}/>
     </div>
   );
}