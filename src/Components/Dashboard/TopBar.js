import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { LOGOUT, USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { Navigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Cookie from "cookie-universal";

export default function TopBar(){
    const menu = useContext(Menu);
    const setIsOpen = menu.setIsOpen;
    const cookie = Cookie();
    const [name, setName] = useState("");
    // console.log(setIsOpen);
    // const [user, setUser] = useState("");

    async function handleLgOut(){
      try{
        const res = await Axios.post(`/auth/logout`);
        // ${LOGOUT}
        cookie.remove("e-commerce"); 
        window.location.pathname = "/login"; 
      }catch(err){
        console.log(err)
      }
  }

    useEffect(() => {
      Axios.get(`/auth/user-profile`)
      // /${USER}
       .then((data) => setName(data.data.name))
       .catch(() => Navigate("/login" ,{ replace: true })); // when apeare an error do this  
   },[]);
    return (
      <div class="top-bar">
    <div class="d-flex align-items-center justify-content-between h-100">
        <div class="d-flex align-items-center gap-5">
        <h3 class="ehsan">إحسان</h3>
        <FontAwesomeIcon 
        onClick={() => setIsOpen((prev) => !prev)} 
        cursor={"pointer"} 
        icon={faBars}  
        color="#479288"
        />
      </div>
      <div class="admin">
        <DropdownButton  color="#479288" class="admin" id="dropdown-basic-button" title={name}>
          <Dropdown.Item class="admin" onClick={handleLgOut}>Logout</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
    </div>
    );
}