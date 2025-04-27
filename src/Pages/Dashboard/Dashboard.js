import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import "./dashboard.css" ;

export default function Dashboard(){
    return <div class="position-relative dashboard ">
        <TopBar />
        <div class="dashboard d-flex gap-1 " style={{marginTop: "70px" }}>
            <SideBar />
            <Outlet />
        </div>
    </div>
}