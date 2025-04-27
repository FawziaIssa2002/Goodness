import {  useEffect, useRef, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import LoadingSubmit from "../../Components/Loading/Loading";
import { CAT, Pro } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

export default function AddProject(){
    const [form, setForm] = useState({
        class_id: "",
        name: "",
        description: "",
        total_budget: "",
        target: "",
        image: "",
        tag:""
    });
    const [dummyForm, setdummyForm] = useState( {
        class_id: null,
        name: "dummy",
        description: "dummy",
        total_budget: 222,
        target: "About",
        image:"",
        tag:""
    });
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories , setCategories] = useState([]);
    // console.log(categories);
    // console.log(images);

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(0);
    // console.log(uploading);
    const [id, setId] = useState("");
    // console.log(id)
    const [sent, setSent] = useState(false);
    const nav = useNavigate();

   
    //Ref
    const focus = useRef("");
    const openImage = useRef("");
    const openTag = useRef("");


    //Handle focus
    useEffect(() =>{
       focus.current.focus();
     } , []);

     function handleOpenImage(){
        openImage.current.click();
     }
     
     function handleOpenTag(){
        openTag.current.click();
     }

     useEffect(() =>{  
        Axios.get(`/classes`)
        // ${CAT}
        .then((data) => setCategories(data.data.data))
        .catch((err) => console.log(err));
     },[]);

    // Handle Submite
    async function HandleEdit(e){
        setLoading(true);
        e.preventDefault();
    try{
     const res = await Axios.post(`/projects/${id}`,form);
     // ${Pro}/edit/
     console.log(res.data)
     nav("/dashboard/projects");
     } catch (err){
         setLoading(false);
         console.log(err);

     }
 }
     
    // Handle Submit-Form
    async function HandleSubmitForm(){
        try{
         const res = await Axios.post(`/projects`, dummyForm);
         setId(res.data.data.id);
        //  console.log(id)
        //  console.log(res)   
        //  .then((data) => console.log(data ))
        //  console.log(res);
        //  console.log(res.data.data);
        // //  ${Pro}/add
        }catch(err){
            console.log(err);
        }
    }

    // HandleChange
    function handleChange(e){
        setForm({ ...form, [e.target.name]: e.target.value});
        setSent(1);
        if(sent !== 1)
        HandleSubmitForm();
    }
    // console.log(form);

    // Handle Image changes
    async function HandleImagesChange(e){
        setImages((prev) => [...prev, ...e.target.files]);

const images = e.target.files;
        const data = new FormData();
        for (let i = 0; i < images.length; i++){
            data.append("image", images[i]);
            //imagesAsFiles[i]
            data.append("project_id", id);
            try{
               const res = Axios.post(`/projects/${id}`, data, {
                 onUploadProgress: (ProgressEvent) => {
                    const loaded = ProgressEvent.loaded;
                    const total = ProgressEvent.total;
                    setUploading((loaded * 100) / total);
                    

                 }
               });
               console.log(res);
            }catch (err){
                console.log(err);
            }
        } 

    }
      

     // Handle Tag changes
     async function HandleTagChange(e){
        setTags((prev) => [...prev, ...e.target.files]);

const tags = e.target.files;
        const data = new FormData();
        for (let i = 0; i < tags.length; i++){
            data.append("tag", tags[i]);
            //imagesAsFiles[i]
            data.append("project_id", id);
            try{
               const res = Axios.post(`/projects/${id}`, data, {
                 onUploadProgress: (ProgressEvent) => {
                    const loaded = ProgressEvent.loaded;
                    const total = ProgressEvent.total;
                    setUploading((loaded * 100) / total);
                    

                 }
               });
               console.log(res);
            }catch (err){
                console.log(err);
            }
        } 

    }   
    //Mapping
    const categoriesShow = categories.map((item, key) => (
        <option key={key} value={item.id}>
            {item.name}
        </option>
    ));

     const imagesShow = images.map((img, key) => (
        <div className=" border p-2 w-100">
        <div className="d-flex align-items-center justify-content-start gab-2">
       <img src={URL.createObjectURL(img)} width="80px" ></img>
       <div>
        <p className="mb-1">{img.name}</p> 
        <p>
            {img.size / 1024 < 900
            ? (img.size / 1024).toFixed(2) + "KB"
            : (img.size / (1024*1024)).toFixed(2) + "MB"}
        </p>
        </div>
        </div>
        <div className="custom-progress mt-3" >
            <span percent={`${uploading}%`}  style={{width: `${uploading}%`}}className="inner-progress"></span>
        </div>
       </div>
     ));

     const tagsShow = tags.map((tag, key) => (
        <div className=" border p-2 w-100">
        <div className="d-flex align-items-center justify-content-start gab-2">
       <img src={URL.createObjectURL(tag)} width="80px" ></img>
       <div>
        <p className="mb-1">{tag.name}</p> 
        <p>
            {tag.size / 1024 < 900
            ? (tag.size / 1024).toFixed(2) + "KB"
            : (tag.size / (1024*1024)).toFixed(2) + "MB"}
        </p>
        </div>
        </div>
        <div className="custom-progress mt-3" >
            <span percent={`${uploading}%`}  style={{width: `${uploading}%`}}className="inner-progress"></span>
        </div>
       </div>
     ));

    return (
        <>
        {loading && <LoadingSubmit />}
        <Form className="bg-white w-100 mx-2 p-3" onSubmit={HandleEdit}>
        <Form.Group className="mb-3" controlId="category">
        <Form.Label>الصنف:</Form.Label>
        <Form.Select
        ref={focus}
        value={form.class_id} 
        onChange={handleChange} 
        name="class_id"  
        placeholder="الصنف.." 
         >
            <option disabled>اختر الصنف</option>
            {categoriesShow}
         </Form.Select>
      </Form.Group>
         <Form.Group className="mb-3" controlId="title">
        <Form.Label>اسم المشروع:</Form.Label>
        <Form.Control
        value={form.name} 
        // required
        onChange={handleChange} 
        name="name"  
        type="text"
        placeholder="الاسم.." 
        disabled={!sent}
         />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>وصف المشروع</Form.Label>
        <Form.Control
        value={form.description} 
        required
        onChange={handleChange} 
        name="description"  
        type="text"
        placeholder="الوصف.." 
        disabled={!sent}
         />
      </Form.Group> <Form.Group className="mb-3" controlId="account">
        <Form.Label>الميزانية الكلية:</Form.Label>
        <Form.Control
        value={form.total_budget} 
        required
        onChange={handleChange}  
        name="total_budget" 
        type="text"
        placeholder="الميزانية الكلية.." 
        disabled={!sent}
         />
      </Form.Group>
       <Form.Group className="mb-3" controlId="city">
        <Form.Label>الجهة المستهدفة:</Form.Label>
        <Form.Control
        value={form.target} 
        // required
        onChange={handleChange}
        name="target"   
        type="text"
        placeholder="الجهة.." 
        disabled={!sent}
         />
         </Form.Group>
         <Form.Group className="mb-3" controlId="images">
        <Form.Label>صور عن المشروع:</Form.Label>
        <Form.Control
        value={form.image}
        ref={openImage}
        hidden
        multiple
        onChange={HandleImagesChange}
        type="file"
        disabled={!sent}
         />
         </Form.Group>

         <div 
           onClick={handleOpenImage}
           className="d-flex align-items-center justify-content-center gap-2 py-3  rounder mb-2 w-100 flex-column "
           style={{ 
            border: !sent ? '2px dashed gray' : "2px dashed #0086fe",

cursor: sent && "pointer",
             }}
             >
            <img src={require('../../assets/3444402.png')} 
             alt="upload here" 
             width="100px"
             style={{ filter: !sent && "grayscale(1)" }} 
            //  this properties in css .. it changes the color of image
             />
             <p className="fw-bold mb-0" style={{ color: !sent ? "gray" : "#0086fe" }}>تحميل الصور</p>
         </div>
        <div className="d-flex align-items-start flex-column gap-2">
            {imagesShow}
        </div>
      
         <Form.Group className="mb-3" controlId="images">
        <Form.Label>التاغ:</Form.Label>
        <Form.Control
        value={form.tag}
        ref={openTag}
        hidden
        multiple
        onChange={HandleTagChange}
        type="file"
        disabled={!sent}
         />
         </Form.Group>
         <div 
           onClick={handleOpenTag}
           className="d-flex align-items-center justify-content-center gap-2 py-3  rounder mb-2 w-100 flex-column "
           style={{ 
            border: !sent ? '2px dashed gray' : "2px dashed #0086fe",

cursor: sent && "pointer",
             }}
             >
            <img src={require('../../assets/3444402.png')} 
             alt="upload here" 
             width="100px"
             style={{ filter: !sent && "grayscale(1)" }} 
            //  this properties in css .. it changes the color of image
             />
             <p className="fw-bold mb-0" style={{ color: !sent ? "gray" : "#0086fe" }}>تحميل الصور</p>
         </div>
        <div className="d-flex align-items-start flex-column gap-2">
            {tagsShow}
        </div>
      <button 
        disabled={
        form.description.length > 1
        ? false
        : true
    }
     className="btn btn-primary">حفظ</button>
        </Form>
        </>
    )
}