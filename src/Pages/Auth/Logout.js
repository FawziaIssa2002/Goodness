import { LOGOUT} from "../../Api/Api";
import { Axios } from "../../Api/axios";
import Cookie from "cookie-universal";


export default function Logout(){

    // Cookies
    // const cookie = Cookie();
    // const token = cookie.get("e-commerce");
    async function handleLogout(){
        try{
          const res = await Axios.post(`/auth/logout`);
          console.log(res);
        }catch(err){
          console.log(err)
        }
    }
    return <button onClick={handleLogout}>Logout</button>
}

// cookie.get("e-commerce")