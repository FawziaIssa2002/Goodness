import { useEffect, useRef, useState } from "react"
import { REGISTER, baseURL } from "../../Api/Api";
import axios from "axios";
import LoadingSubmit from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
export default function Register(){
    //States
    const[form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate(); 


    //Loading
     const [loading , setLoading] = useState(false); // I want it to run when I send data and stop when he finifh sending data

     // Cookie
     const cookie = Cookie();

    //Err
    const [err,setErr] = useState("");

     //Ref
     const focus = useRef(null);


   //  Handle Form change
    function handleChange(e){
    //    e.preventDefault();
       setForm({ ...form, [e.target.name]: e.target.value });//e event target writing name place
    }
      //Handle focus
      useEffect(() =>{
        focus.current.focus();
    } , []);


    // Handle Submit
    async function handleSubmit(e){
       e.preventDefault();
       setLoading(true)
       try {
         let res = await axios.post(`${baseURL}/${REGISTER}` , form);
         setLoading(false);
         const token = res.data.token; 
         cookie.set('e-commerce', token);
        //  navigate("/dashboard/users" , {replace: true});
         window.location.pathname = "/dashboard/users" ;
        //  console.log(res);
       }catch(err){
        console.log(err);
        setLoading(false);
        if(err.response.status === 422){
            setErr("Email is already been taken")
        }else{
            setErr("Internal Server Err");
        }
       }
    }
    // console.log(form);
    return (
        <>
        {loading && <LoadingSubmit/>}
        <div className="container">
            {/* <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
            </Form> */}
{/* <div>
  <div classname="mb-3">
    <label htmlFor="exampleFormControlInput1" classname="form-label">
        Email address
        </label>
    <input
     type="email" 
     classname="form-control" 
     id="exampleFormControlInput1" 
     placeholder="name@example.com" 
     />
  </div>
  <div classname="mb-3">
    <label htmlFor="exampleFormControlInput1" classname="from-label">Example textarea </label>
    <textarea classname="form-control" id="exampleFormControlInput1" rows={3} defaultValue={" "} />
  </div>
</div> */}

         
         {/*  */}

    <div className="row" style={{height: "100vh"}}>
     <Form className="form" onSubmit={handleSubmit}>
        <div className="custom-form">
            <h1 >Register Now</h1>
            <Form.Group 
         className="form-custom"
        controlId="exampleForm.ControlInput2"
        >
        <Form.Control
        ref={focus}
        type="text"
        name="name"
         value={form.name} 
         onChange={handleChange}   
         placeholder="Enter your name.." 
         required
         />
        <Form.Label>Name:</Form.Label>
      </Form.Group>
     <Form.Group 
     className="form-custom" 
     controlId="exampleForm.ControlInput1">
        <Form.Control
         type="email" 
         name="email"
        value={form.email}
        onChange={handleChange}
         placeholder="Enter your email" 
         required
         />
        <Form.Label>Email:</Form.Label>
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
        <Form.Label>Password:</Form.Label>
      </Form.Group>
        <button className="btn btn-primary">Register</button>

        {err !== "" && <span className="error">{err}</span> }
        </div>
        </Form>
        </div>
        </div>
        </>
    )
}