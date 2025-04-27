import { useEffect, useRef, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Axios } from "../../Api/axios"; 
import { Cat, USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Category(){
    const [name ,setName] = useState("");
    const [image ,setImage] = useState("");
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    // Id
    const {id} = useParams();
    
    useEffect(() => {
        setLoading(true); 
        Axios.post(`/classes/${id}`)
        // get
        // ${Cat}
        .then((data) =>{
            // console.log(data.data.name);
            setLoading(false);
        })
        .then(() => setDisable(false))
        .catch(() => nav("/dashboard/categories/page/404") , {replace: true});
    },[]);

    // Handle Submite
    async function HandleSubmit(e){
        setLoading(true);
        e.preventDefault();
        const form = new FormData();
        form.append("name", name);
        form.append("image", image);
        try{
        const res = await Axios.get(`/classes/${id}`, form);
        // ${Cat}/edit/
        window.location.pathname = "/dashboard/categories";
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
        <Form.Label>اسم الصنف:</Form.Label>
        <Form.Control
        type="text"
        name="name"
        required
         value={name} 
         onChange={(e) => setName(e.target.value)}   
         placeholder="الاسم.." 
         />
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
      <Form.Label>صورة الصنف:</Form.Label>
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