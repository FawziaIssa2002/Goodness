// import { useEffect, useState } from "react"
// import { Axios } from "../../Api/axios";
// import { Link } from "react-router-dom";
// import TableShow from "../../Components/Dashboard/Table";
// import { DNR, Dnr, PRO, Pro } from "../../Api/Api";
// import Table2Show from "../../Components/Dashboard/Table2";

// export default function Donners(){
//   //States
//    const [donners , setDonners] = useState([]);
//   //  console.log(donners);

//    //Get All Categories
//     useEffect(() =>{  
//         Axios.get(`/donation`)
//         // ${DNR}
//         .then((data) => setDonners(data.data.data))
//         .catch((err) => console.log(err));
//      },[]);

//      const header = [
//         {
//         key: "name",
//         name: "اسم المتبرع"
//         },
//         {
//           key: "email",
//           name: "الإيميل"
//         },
//         {
//         key: "amount",
//         name: "كمية التبرع", 
//         },
//         {
//         key: "bank_id",
//         name: "رقم البنك",
//         },
//         // {
//         // key: "date",
//         // name: "Date"
//         // },
//         {
//         key: "project_name",
//         name: "اسم المشروع"
//         },
//         {
//         key: "note",
//         name: "تعليق",
//         },
//     ];
    
//     //Handle Delete
//     // async function handleDelete(id){
//     //   try{
//     //     const res = await Axios.delete(`${DNR}/${id}`); 
//     //     setDonners((prev) => prev.filter((item) => item.id !== id));
//     //   }catch(err){
//     //     console.log(err);
//     //   }
//     // }
 
 
 
//      //if axios is not found .. the server will give me error 500
//      //so we will use axios instead of fetch ..and will delete the json
//      // because axios do json internal and will write catch to catch error
//      // if we run code now will give error unuthorization because he need data
//      //so dont forgive to put auth by headers and bring token
    
//    return (
//      <div class="bg-white w-100 p-2">
//        <div class="d-flex align-items-center justify-content-between">
//          <h1 className="title-table">تفاصيل التبرعات</h1>
//          {/* <Link className="btn btn-primary" to="/dashboard/category/add">
//            Add Product
//          </Link> */}
//        </div>
//        <Table2Show header={header} data={donners}  />
      
//         {/* delete={handleDelete} */}
//      </div>
//    );
// }

import { useEffect, useState } from "react"
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";
import { DNR, Dnr, PRO, Pro } from "../../Api/Api";
import Table2Show from "../../Components/Dashboard/Table2";

export default function Donners(){
  //States
   const [donners , setDonners] = useState([]);
  //  console.log(donners);

   //Get All Categories
    useEffect(() =>{  
       const res = Axios.get(`/donation`)
        // ${DNR}
        .then((data) => setDonners(data.data.data))
        .catch((err) => console.log(err));
        console.log(res);
     },[]);

     const header = [
        {
        key: "name",
        name: "اسم المتبرع"
        },
        {
          key: "email",
          name: "الإيميل"
        },
        {
        key: "amount",
        name: "كمية التبرع", 
        },
        {
        key: "bank_id",
        name: "رقم البنك",
        },
        // {
        // key: "date",
        // name: "Date"
        // },
        {
        key: "project_name",
        name: "اسم المشروع"
        },
        {
        key: "note",
        name: "تعليق",
        },
    ];
    
    //Handle Delete
    // async function handleDelete(id){
    //   try{
    //     const res = await Axios.delete(${DNR}/${id}); 
    //     setDonners((prev) => prev.filter((item) => item.id !== id));
    //   }catch(err){
    //     console.log(err);
    //   }
    // }
 
 
 
     //if axios is not found .. the server will give me error 500
     //so we will use axios instead of fetch ..and will delete the json
     // because axios do json internal and will write catch to catch error
     // if we run code now will give error unuthorization because he need data
     //so dont forgive to put auth by headers and bring token
    
   return (
     <div class="bg-white w-100 p-2">
       <div class="d-flex align-items-center justify-content-between">
         <h1>تفاصيل التبرعات</h1>
         {/* <Link className="btn btn-primary" to="/dashboard/category/add">
           Add Product
         </Link> */}
       </div>
       <Table2Show header={header} data={donners}  />
      
        {/* delete={handleDelete} */}
     </div>
   );
}