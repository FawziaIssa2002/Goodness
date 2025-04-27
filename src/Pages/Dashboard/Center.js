import { useEffect, useRef, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Axios } from "../../Api/axios"; 
import { Cat, Ctr, USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Center(){
    const [name ,setName] = useState("");
    const [address ,setAddress] = useState("");
    const [phone ,setPhone] = useState("");
    const [image ,setImage] = useState("");
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    // Id
    const {id} = useParams();
    
    useEffect(() => {
        setLoading(true); 
        Axios.get(`/info_center/${id}`).then((data) =>{
            //  get  ${Ctr}/
            setName(data.data.data.name);
            setAddress(data.data.data.address);
            setPhone(data.data.data.phone);
            setLoading(false);
        })
        .then(() => setDisable(false))
        .catch(() => nav("/dashboard/centers/page/404") , {replace: true});
    },[]);

    // Handle Submite
    async function HandleSubmit(e){
        setLoading(true);
        e.preventDefault();
        const form = new FormData();
        form.append("name", name);
        form.append("address", address);
        form.append("phone", phone);
        form.append("image", image);
        try{
        const res = await Axios.post(`/centers/${id}`, form);
        // ${Ctr}/edit/
        window.location.pathname = "/dashboard/centers";
        } catch (err){
            setLoading(false);
            // console.log(err);

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
        type="text"
        name="name"
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
        type="text"
        name="address"
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
        type="text"
        name="phone"
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
      <button disabled={disable} className="btn btn-primary">حفظ</button>
        </Form>
        </>
    )
}