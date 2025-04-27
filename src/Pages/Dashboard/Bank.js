import { useEffect, useRef, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Axios } from "../../Api/axios"; 
import { Cat, Ctr, USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Bank(){
    const [name ,setName] = useState("");
    const [bill_num ,setBill_num] = useState("");
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    // Id
    const {id} = useParams();
    
    useEffect(() => {
        setLoading(true); 
        Axios.get(`/info_bank/${id}`).then((data) =>{
            //  get  ${Ctr}/
            setName(data.data.data.name);
            setBill_num(data.data.data.bill_num);
            setLoading(false);
        })
        .then(() => setDisable(false))
        .catch(() => nav("/dashboard/banks/page/404") , {replace: true});
    },[]);

    // Handle Submite
    async function HandleSubmit(e){
        setLoading(true);
        e.preventDefault();
        const form = new FormData();
        form.append("name", name);
        form.append("bill_num", bill_num);
        try{
        const res = await Axios.post(`/banks/${id}`, form);
        // ${Ctr}/edit/
        window.location.pathname = "/dashboard/banks";
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
        <Form.Label>اسم البنك:</Form.Label>
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
        <Form.Label>رقم الفاتورة:</Form.Label>
        <Form.Control
        type="text"
        name="bill_num"
        required
         value={bill_num} 
         onChange={(e) => setBill_num(e.target.value)}   
         placeholder="رقم الفاتورة.." 
         />
      </Form.Group>
      {/* <Form.Group 
         className="mb-3"
        controlId="exampleForm.ControlInput1"
        >
        <Form.Label>phone</Form.Label>
        <Form.Control
        type="text"
        name="phone"
        required
         value={phone} 
         onChange={(e) => setPhone(e.target.value)}   
         placeholder="phone.." 
         />
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
      <Form.Label>Image</Form.Label>
        <FormControl 
         onChange={(e) => setImage(e.target.files.item(0))}
         type="file"
         ></FormControl>
      </Form.Group> */}
      <button disabled={disable} className="btn btn-primary">حفظ</button>
        </Form>
        </>
    )
}