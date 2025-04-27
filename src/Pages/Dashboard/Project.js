import { useEffect, useRef, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Axios } from "../../Api/axios"; 
import { Cat, Ctr, USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Project(){
    const [name ,setName] = useState("");
    const [class_id ,setClass_id] = useState("");
    const [description ,setDescription] = useState("");
    const [total_budget ,setTotal_budget] = useState("");
    const [target ,setTarget] = useState("");
    const [image ,setImage] = useState("");
    const [tag ,setTag] = useState("");
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    // Id
    const {id} = useParams();
    
    useEffect(() => {
        setLoading(true); 
       const res = Axios.get(`/info_project/${id}`).then((data) =>{
        console.log(data)
            //  get  ${Ctr}/
            //.post(`/projects/${id}`
            setName(data.data.data.name);
            // setImage(data.data.image);
            // setClass_id(data.data.class_id);
            setDescription(data.data.data.description);
            setTotal_budget(data.data.data.total_budget)
            setTarget(data.data.data.target);
            setTag(data.data.data.tag);
            setLoading(false);
        })
        .then(() => setDisable(false))
        .catch(() => nav("/dashboard/projects/page/404") , {replace: true});
        console.log(res);
    },[]);
     
    // Handle Submite
    async function HandleSubmit(e){
        setLoading(true);
        e.preventDefault();
        const form = new FormData();
        form.append("name", name);
        // form.append("image", image);
        // form.append("class_id", class_id);
        form.append("description", description);
        form.append("total_budget", total_budget);
        form.append("target", target);
        form.append("tag", tag);
        try{
        const res = await Axios.post(`/projects/${id}`, form);
        // ${Ctr}/edit/
        //.post(`/projects/${id}`
        window.location.pathname = "/dashboard/projects";
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
        <Form.Label>اسم المشروع:</Form.Label>
        <Form.Control
        type="text"
        name="name"
        required
         value={name} 
         onChange={(e) => setName(e.target.value)}   
         placeholder="اسم المشروع.." 
         />
      </Form.Group> 
      <Form.Group 
         className="mb-3"
        controlId="exampleForm.ControlInput1"
        >
        <Form.Label>وصف المشروع:</Form.Label>
        <Form.Control
        type="text"
        name="description"
        required
         value={description} 
         onChange={(e) => setDescription(e.target.value)}   
         placeholder="الوصف.." 
         />
      </Form.Group>
      <Form.Group 
         className="mb-3"
        controlId="exampleForm.ControlInput1"
        >
        <Form.Label>الميزانية الكلية:</Form.Label>
        <Form.Control
        type="text"
        name="total_budget"
        required
         value={total_budget} 
         onChange={(e) => setTotal_budget(e.target.value)}   
         placeholder="الميزانية الكلية.." 
         />
      </Form.Group>
      <Form.Group 
         className="mb-3"
        controlId="exampleForm.ControlInput1"
        >
        <Form.Label>الجهة المستهدفة:</Form.Label>
        <Form.Control
        type="text"
        name="target"
        required
         value={target} 
         onChange={(e) => setTarget(e.target.value)}   
         placeholder="الوجهة.." 
         />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="image">
      <Form.Label>صور عن المشروع:</Form.Label>
        <FormControl 
         onChange={(e) => setImage(e.target.files.item(0))}
         type="file"
         ></FormControl>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="image">
      <Form.Label>التاغ:</Form.Label>
        <FormControl 
         onChange={(e) => setTag(e.target.files.item(0))}
         type="file"
         ></FormControl>
      </Form.Group>

      <button disabled={disable} className="btn btn-primary">حفظ</button>
        </Form>
        </>
    )
}