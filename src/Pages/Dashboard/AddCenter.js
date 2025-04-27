import {  useEffect, useRef, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { Cat, Ctr}  from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";

export default function AddCenter(){
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
       //Ref
       const focus = useRef(null);

       //Handle focus
       useEffect(() =>{
         focus.current.focus();
     } , []);

    // Handle Submite
    async function HandleSubmit(e){
        setLoading(true);
        e.preventDefault();
        // if we want to up images we have to use FormData
        const form = new FormData();
        form.append("name", name);
        form.append("address", address);
        form.append("phone", phone);
        form.append("image", image);
        try{
        const res = await Axios.post(`/centers`, form);
        //${Ctr}/add
        window.location.pathname = "/dashboard/centers";
        } catch (err){
            setLoading(false);
            console.log(err);

        }
    }
    return (
        <>
        {loading && <LoadingSubmit />}
        <Form className="bg-white w-100 mx-2 p-3" onSubmit={HandleSubmit}>
         <Form.Group 
         className="mb-3"
        controlId="exampleForm.ControlInput1"
        >
        <Form.Label>اسم المركز:</Form.Label>
        <Form.Control
        ref={focus}
        type="text"
        required
         value={name} 
         onChange={(e) => setName(e.target.value)}   
         placeholder="الاسم.." 
         />
      </Form.Group>
      <Form.Group 
         className="mb-3"
        controlId="exampleForm.ControlInput1"
        >
        <Form.Label>العنوان:</Form.Label>
        <Form.Control
        ref={focus}
        type="text"
        required
         value={address} 
         onChange={(e) => setAddress(e.target.value)}   
         placeholder="العنوان.." 
         />
      </Form.Group>
      <Form.Group 
         className="mb-3"
        controlId="exampleForm.ControlInput1"
        >
        <Form.Label>رقم المركز:</Form.Label>
        <Form.Control
        ref={focus}
        type="text"
        required
         value={phone} 
         onChange={(e) => setPhone(e.target.value)}   
         placeholder="الرقم.." 
         />
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
      <Form.Label>صورة المركز:</Form.Label>
        <FormControl 
         onChange={(e) => setImage(e.target.files.item(0))}
         type="file"
         ></FormControl>
      </Form.Group>
    
      <button 
        disabled={
        name.length > 1
        ? false
        : true
    }
     className="btn btn-primary">حفظ</button>
        </Form>
        </>
    )
}