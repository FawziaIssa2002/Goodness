import { useEffect, useRef, useState } from "react"

//React useRef Hook1
// import { Form } from "react-bootstrap";

// export default function Test(){
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });

//     // const ahmed = useRef("s");
//     // console.log(ahmed.current)
//     const focus = useRef(null);// Ref dont do rerender to page
//    useEffect(() => {
//       focus.current.focus();//current is one of properties of inputs
//    }, [])

//     //Handle Form Change
//     function handleChange(e){
//         setForm({ ...form, [e.target.name]: e.target.value });
//     }
//     return (
//         <div className="container">
//             <div className="row">
//             <Form>
//                 <div>
//                     <h1 className="mb-5">Register</h1>
//                     <Form.Group>
//                     <Form.Label>Name:</Form.Label>
//                      <Form.Control
//                       type="text"
//                       name="name"
//                       required
//                       value={form.name} 
//                      onChange={handleChange}   
//                     placeholder="name.." 
//                     ref={focus}
//                     />
//                  </Form.Group>
//                  <Form.Group>
//                     <Form.Label>Email:</Form.Label>
//                      <Form.Control
//                       type="text"
//                       name="email"
//                       required
//                       value={form.email} 
//                      onChange={handleChange}   
//                     placeholder="email.." 
//                     />
//                  </Form.Group>
//                  <Form.Group>
//                     <Form.Label>Password:</Form.Label>
//                      <Form.Control
//                       type="password"
//                       name="password"
//                       required
//                       value={form.password} 
//                      onChange={handleChange}   
//                     placeholder="password.." 
//                     />
//                  </Form.Group>
//                 </div>
//            </Form>
//             </div>
//         </div>
//     )
// }

//React useRef Hook2
// export default function Test(){
//     const [click, setClick] = useState("");
//     const count = useRef(0);
//     useEffect(() =>{
//         count.current = count.current + 1;
//     });
//     return(
//         <div className="container">
//           <input 
//           value={click}
//           onChange={(e) => {
//             setClick(e.target.value)}}
//           placeholder="write"
//           />
//           <p> count : {count.current} </p>
//         </div>
//     )
// }

// React useRef Hook3
export default function Test(){
        const [click, setClick] = useState("");
        const name = useRef(" ");
        // console.log(name)
        useEffect(() =>{

        },[]);
        return(
            <div className="container">
              <input 
              value={click}
              onChange={(e) => {
                setClick(e.target.value)}}
              placeholder="write"
              />
              <p ref={name} className="test"> Ahmed </p>
            </div>
        )
    }