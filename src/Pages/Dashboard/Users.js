// import { useEffect, useState } from "react"
// import { USER, USERS, baseURL } from "../../Api/Api";
// import { Table } from "react-bootstrap";
// import { Axios } from "../../Api/axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// import TableShow from "../../Components/Dashboard/Table";
// import "./dashboard.css";
// export default function Users(){
//     const [users, setUsers] = useState([]);
//     const [currentUser, setCurrentUser] = useState("");
//     // console.log(users);

//     // Get Current User
//     useEffect(() => {
//       Axios.get(`/auth/user-profile`)
//       .then((res) => setCurrentUser(res.data));
//       // /${USER}
//     },[]);
 
//     //Get All Usres
//     useEffect(() =>{  
//        Axios.get(`/show_users`)
//        // ${USERS}
       
//        .then((data) => setUsers(data.data.data))
//        .catch((err) => console.log(err));
//     },[]);
    
//     const header = [
//       {
//         key: "name",
//         name: "اسم المستفيد",
//       },
//       {
//         key: "email",
//         name: "الإيميل",
//       },
//       {
//         key: "center_id",
//         name: "رقم المركز",
//       },
//       // {
//       //   key: "project_name",
//       //   name: "Project_name",
//       // },
//     ];
    
//     //Handle Delete
//     async function handleDelete(id){
//       // if(currentUser.id !== id){
//       try{
//         const res = await Axios.delete(`/user/${id}`); 
//         // ${USER}/${id}
//         setUsers((prev) => prev.filter((item) => item.id !== id));
//       //   setDeleteUser((prev) => !prev);
//         // console.log(res);
//       }catch(err){
//         // console.log(err);
//       }
//     }

//     //Filter Users
//     // const userFilter = users.filter((user) => user.id !== currentUser.id);
//     //Mapping On Users
//     const usersShow = users.map((user, key) => (
//       // console.log(user.id);
//         <tr key={key}>
//             <td>{key +1}</td>
//             <td>{user.name === currentUser.name ? user.name + "(أنت)" : user.name}</td>
//             <td>{user.email}</td>
//             <td>{user.role_id === "3"
//              ? 'مدير' 
//              : user.role_id === "1" 
//              ? 'مستفيد'
//               : 'متبرع'}
//               </td>
//             <td >
//               <div className="d-flex align-items-center gap-2">
//             <Link to={`${user.id}`} >
//               <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
//             </Link>
//             {currentUser.name !== user.name && (
//             <FontAwesomeIcon
//              onClick={() => handleDelete(user.id)} 
//              fontSize={"19px"}
//              color="red"
//              cursor={"pointer"}
//              icon={faTrash} 
//              />
//              )}
//             </div>
//             </td>
//         </tr>
//     ));
   

//     //if axios is not found .. the server will give me error 500
//     //so we will use axios instead of fetch ..and will delete the json
//     // because axios do json internal and will write catch to catch error
//     // if we run code now will give error unuthorization because he need data
//     //so dont forgive to put auth by headers and bring token
   
//   return (
//     <div className="bg-white w-100 p-2">
//       <div className="d-flex align-items-center justify-content-between">
//         <h1>المستفيدين</h1>
//         <div className="btn">
//         <Link className="link" to="/dashboard/user/add">
//         {/* btn-success */}
//           <p>إضافة مستفيد جديد</p>
//         </Link>
//         </div>
//       </div>
//      <TableShow 
//       header={header}
//       data={users}
//       currentUser={currentUser}
//       delete={handleDelete}
//          />
//     </div>

//     );
// }



import { useEffect, useState } from "react"
import { USER, USERS, baseURL } from "../../Api/Api";
import { Table } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";
import "./dashboard.css";
export default function Users(){
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    console.log(users);

    // Get Current User
    useEffect(() => {
      Axios.get(`/auth/user-profile`)
      .then((res) => setCurrentUser(res.data));
      // /${USER}
    },[]);
 
    //Get All Usres
    useEffect(() =>{  
       Axios.get(`/show_users`)
       // ${USERS}
       
       .then((data) => setUsers(data.data.data))
       .catch((err) => console.log(err));
    },[]);
    
    const header = [
      {
        key: "name",
        name: "اسم المستفيد",
      },
      {
        key: "email",
        name: "الإيميل",
      },
      {
        key: "center_id",
        name: "رقم المركز",
      },
      {
        key: "num_family",
        name: "عدد أفراد العائلة",
      },
      {
        key: "base_pay",
        name: "الراتب الشهري",
      },
      {
        key: "birthday",
        name: "تاريخ الميلاد",
      },
      {
        key: "state",
        name: "الحالة الصحية",
      },
      // {
      //   key: "project_name",
      //   name: "Project_name",
      // },
    ];
    
    //Handle Delete
    async function handleDelete(id){
      // if(currentUser.id !== id){
      try{
        const res = await Axios.delete(`/user/${id}`); 
        // ${USER}/${id}
        setUsers((prev) => prev.filter((item) => item.id !== id));
      //   setDeleteUser((prev) => !prev);
        // console.log(res);
      }catch(err){
        console.log(err);
      }
    }

    //Filter Users
    // const userFilter = users.filter((user) => user.id !== currentUser.id);
    //Mapping On Users
    const usersShow = users.map((user, key) => (
      // console.log(user.id);
        <tr key={key}>
            <td>{key +1}</td>
            <td>{user.name === currentUser.name ? user.name + "(أنت)" : user.name}</td>
            <td>{user.email}</td>
            <td>{user.role_id === "3"
             ? 'مدير' 
             : user.role_id === "1" 
             ? 'مستفيد'
              : 'متبرع'}
              </td>
            <td >
              <div className="d-flex align-items-center gap-2">
            <Link to={`${user.id}`} >
              <FontAwesomeIcon color="gray" fontSize={"19px"} icon={faPenToSquare} />
            </Link>
            {currentUser.name !== user.name && (
            <FontAwesomeIcon
             onClick={() => handleDelete(user.id)} 
             fontSize={"19px"}
             color="red"
             cursor={"pointer"}
             icon={faTrash} 
             />
             )}
            </div>
            </td>
        </tr>
    ));
   

    //if axios is not found .. the server will give me error 500
    //so we will use axios instead of fetch ..and will delete the json
    // because axios do json internal and will write catch to catch error
    // if we run code now will give error unuthorization because he need data
    //so dont forgive to put auth by headers and bring token
   
  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="title-table">المستفيدين</h1>
        <div>
        <Link className="btn btn-primary" to="/dashboard/user/add">
        {/* btn-success */}
          إضافة مستفيد جديد
        </Link>
        </div>
      </div>
     <TableShow 
      header={header}
      data={users}
      currentUser={currentUser}
      delete={handleDelete}
         />
    </div>

    );
}