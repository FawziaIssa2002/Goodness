import { Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { Axios } from "../../Api/axios";
import Err403 from "./403";

export default function RequireAuth({allowedRole}){

    const Navigate = useNavigate();
    // User 
    const [user, setUser] = useState("");
    // console.log(user);
    useEffect(() => {
      const res = Axios.get(`/auth/user-profile`)
        .then((data) => {setUser(data.data);
            // console.log(data);
        })
        .catch(() => Navigate("/login" ,{ replace: true }));  // when apeare an error do this  
        // console.log(res);
        // /${USER}
    },[]);

    // <Outlet/> : <Navigate to={"/login"} replace={true} />
    // Token  & Cookie
    const cookie = Cookie();
    const token = cookie.get("e-commerce");
    // {console.log(user.role_id +allowedRole )}

    return token ?(
         user === "" ? ( 
         <LoadingSubmit /> 
         ) : allowedRole.includes(user.role_id) ? (
         <Outlet />
         )  : (
         <Err403 role={user.role_id} />
         )
          ) : (
             <Navigate to={"/login"} replace={true} />
     ); // put replace for no return me to dashboard 
}