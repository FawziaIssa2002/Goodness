import { useEffect, useState } from "react"
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";
import { BNK, Bnk, CTR, Ctr, PRO, Pro } from "../../Api/Api";

export default function Banks(){
  //States
   const [banks , setBanks] = useState([]);
  //  console.log(banks);

   //Get All Categories
    useEffect(() =>{  
        Axios.get(`/banks`)
        // ${BNK}
        .then((data) => setBanks(data.data.data))
        .catch((err) => console.log(err));
     },[]);

     const header = [
        {
        key: "name",
        name: "اسم البنك"
        },
        {
         key: "bill_num",
         name: "رقم الفاتورة"
        },
    ];
    
    //Handle Delete
    async function handleDelete(id){
      try{
        const res = await Axios.post(`/bank/${id}`); 
        // ${Bnk}
        setBanks((prev) => prev.filter((item) => item.id !== id));
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
         <h1 className="title-table">بنوك الجمعية</h1>
         <Link className="btn btn-primary" to="/dashboard/banks/add">
           إضافة بنك جديد
         </Link>
       </div>
        <TableShow header={header} data={banks} delete={handleDelete}/>
     </div>
   );
}