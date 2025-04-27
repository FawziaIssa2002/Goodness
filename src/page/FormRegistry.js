import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import { Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import LoadingSubmit from "../Components/Loading/Loading";
import { baseURL, LOGIN } from "../Api/Api";

export default function FormRegistry() {
    // States
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const focus = useRef(null);
    const navigate = useNavigate();
    const cookie = Cookie();

    useEffect(() => {
        focus.current.focus();
    }, []);

    // Handle Form change
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Handle Submit
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${baseURL}/auth/${LOGIN}`, form);
            console.log(res);
            setLoading(false);
            const token = res.data.access_token;
            const role = res.data.user.role_id;
            const id = res.data.user.id;
            // console.log(id);
            cookie.set('e-commerce', token);

            // Use `Navigate` to programmatically navigate
            if (role === 3) {
                navigate(`/dashboard/donners`, { state: { id } });
            } else if (role === 2) {
                navigate(`/donner/${id}`);
            } else {
                navigate(`/respons`, { state: { id } });
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
            if (err.response && err.response.status === 401) {
                setErr("Wrong Email or password");
            } else {
                setErr("Internal Server Error");
            }
        }
    }

    return (
        <>
            {loading && <LoadingSubmit />}
            <div className="container">
                <div className="row" style={{ height: "100vh" }}>
                    <Form className="form" onSubmit={handleSubmit}>
                        <div className="custom-form">
                            <h1 className="mb-5">تسجيل الدخول</h1>
                            <div></div>
                            <Form.Group
                                className="form-custom"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    ref={focus}
                                />
                                <Form.Label dir="rtl">الإيميل:</Form.Label>
                            </Form.Group>
                            <Form.Group
                                className="form-custom"
                                controlId="exampleForm.ControlInput2"
                            >
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your Password.."
                                    minLength="6"
                                    required
                                />
                                <Form.Label>كلمة المرور:</Form.Label>
                            </Form.Group>
                            <button color="#479288" className="btn">سجل الدخول</button>
                            {err !== "" && <span className="error">{err}</span>}
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}




// import { useEffect, useRef, useState } from "react"
// // import { LOGIN, baseURL } from "..Api/";
// import axios from "axios";
// // import LoadingSubmit from "../../Components/Loading/Loading";
// import Cookie from "cookie-universal";
// import {Form} from 'react-bootstrap';
// import { Navigate, useNavigate } from "react-router-dom";
// import LoadingSubmit from "../Components/Loading/Loading";
// import { baseURL, LOGIN, LOGOUT } from "../Api/Api";
// // import "./login.css" 
// // import "./Auth.css";
// export default function FormRegistry(){
//     //States
//     // const role=1
//     const[form, setForm] = useState({
//         email: "",
//         password: "",
//         // role_id:""
//     });
//     const navigate = useNavigate(); 
//      //Loading
//      const [loading , setLoading] = useState(false); // I want it to run when I send data and stop when he finifh sending data

//      //Cookies
//      const cookie = Cookie();

//     //Err
//     const [err,setErr] = useState("");

//     //Ref
//     const focus = useRef(null);

//    //  Handle Form change
//     function handleChange(e){
//     //    e.preventDefault();
//        setForm({ ...form, [e.target.name]: e.target.value });
//     }
//     useEffect(() =>{
//         focus.current.focus();
//     } , []);

//     const [cardsData, setCardsData] = useState([]);

   
//     // Handle Submit
//     async function handleSubmit(e){
//        e.preventDefault();
//        setLoading(true);
//        try {
//         const res = await axios.post(`${baseURL}/auth/${LOGIN}` , form);
//         console.log(res)
//          setLoading(false);
//          const token = res.data.access_token; 
//         const role = res.data.user.role_id;
//         const id=res.data.user.id;
//          console.log(id);
//          const go = role === 3 ? 'donners' : '/respons';
//         //  console.log(go);
//          cookie.set('e-commerce', token)
//          role ==3 ?(
//             window.location.pathname=`/dashboard/${go}`):
//          role ==2 ?(window.location.pathname=`/donner/${go}`):
//          window.location.pathname=`${go}`
//         //   console.log(res);
//        }catch(err){
//         setLoading(false);
//         console.log(err);
//         if(err.response.status === 401){
//             setErr("wrong Email or password");
//         } else{
//             setErr("Internal Server Err");
//         }
//        }
//     }
//     // console.log(form);
//     return (
//         <>
//         {loading && <LoadingSubmit/>}
//         <div className="container">
//     <div className="row" style={{height: "100vh"}}>
//      <Form className="form" onSubmit={handleSubmit}>
//         <div className="custom-form">
//             <h1 className="mb-5">تسجيل الدخول</h1>
//             <div></div>
//      <Form.Group 
//      className="form-custom" 
//      controlId="exampleForm.ControlInput1">
//         <Form.Control
//          type="email" 
//          name="email"
//         value={form.email}
//         onChange={handleChange}
//          placeholder="Enter your email" 
//          required
//          ref={focus}
//          />
//         <Form.Label dir="rtl" >الإيميل:</Form.Label>
//       </Form.Group>
//         <Form.Group 
//          className="form-custom"
//         controlId="exampleForm.ControlInput2"
//         >
//         <Form.Control
//         type="password"
//         name="password"
//          value={form.password} 
//          onChange={handleChange}   
//          placeholder="Enter your Password.." 
//          minLength="6"
//          required
//          />
//         <Form.Label>كلمة المرور:</Form.Label>
//       </Form.Group>
//         <button color="#479288" className="btn">سجل الدخول</button>
//         {err !=="" && <span className="error">{err}</span> }
//         </div>
//         </Form>
//         </div>
//         </div>
//         </>
//     )
// }