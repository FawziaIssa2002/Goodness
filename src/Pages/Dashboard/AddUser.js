import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
// import Select from "react-select";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";



export default function AddUser(){
    const [name ,setName] = useState("");
    const [email ,setEmail] = useState("");
    const [role_id, setRole] = useState("");
    const [password, setPassword] = useState(true);
    const [center_id, setCenter_id] = useState("");
    const [job, setJob] = useState("");
    const [num_family, setNum_family] = useState("");
    const [base_pay, setBase_pay] = useState("");
    const [birthday, setBirthday] = useState("");
    const [state, setState] = useState("");
   //  const [project_name, setProject_name] = useState("");
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
        try{
        const res = await Axios.post(`/users`,{
            // ${USER}/add
            name: name,
            email: email,
            password: password,
            role_id: role_id,
            // project_name: project_name,
            center_id: center_id,
            job: job,
            num_family: num_family,
            base_pay: base_pay,
            birthday: birthday,
            state: state,
        });
        window.location.pathname = "/dashboard/users";
        } catch (err){
            setLoading(false);
            console.log(err);

        }
    }
    const healthOptions = [
      { value: "سليم", label: "سليم" },
      { value: "أعمى", label: "أعمى" },
      { value: "عاجز عن الحركة بشمل جزئي", label: "عاجز عن الحركة بشمل جزئي" },
      { value: "أصم", label: "أصم" },
      { value: "مبتور القدمين", label: "مبتور القدمين" },
      { value: "مريض سرطان", label: "مريض سرطان" },
      { value: "مبتور يد يسرى", label: "مبتور يد يسرى" },
      { value: "مبتور اليدين", label: "مبتور اليدين" },
      { value: "مبتور قدم يسار", label: "مبتور قدم يسار" },
      { value: "مبتور قدم يمين", label: "مبتور قدم يمين" },
      { value: "مصاب حرب", label: "مصاب حرب" },
      { value: "فشل كبدي", label: "فشل كبدي" },
      { value: "مريض قلب", label: "مريض قلب" },
      { value: "شلل كامل", label: "شلل كامل" },
      { value: "شلل نصفي", label: "شلل نصفي" },
      { value: "مبتور يد يمنى", label: "مبتور يد يمنى" },
      { value: "جنون", label: "جنون" },
      { value: "مريض قسم الداخلية", label: "مريض قسم الداخلية" },
      { value: "صرع", label: "صرع" },
      { value: "أمراض جهازية", label: "أمراض جهازية" },
      { value: "معاق ذهني", label: "معاق ذهني" },
      { value: "إعاقة سمعية", label: "إعاقة سمعية" },
      { value: "إعاقة بصرية", label: "إعاقة بصرية" },
      { value: "شلل دماغي", label: "شلل دماغي" },
      { value: "إعاقة حركية", label: "إعاقة حركية" },
      { value: "ربو", label: "ربو" },
      { value: "مريض كلى", label: "مريض كلى" },
      { value: "ضعف بصر شديد", label: "ضعف بصر شديد" },
      { value: "آلام مفاصل", label: "آلام مفاصل" },
      { value: "نقص مناعة", label: "نقص مناعة" },
      { value: "انحراف", label: "انحراف" },
      { value: "أعمى يمين", label: "أعمى يمين" },
      { value: "أعمى يسار", label: "أعمى يسار" },
      { value: "مريض كليتين", label: "مريض كليتين" },
      { value: "مريض مرتبة 1", label: "مريض مرتبة 1" },
      { value: "مريض مرتبة 2", label: "مريض مرتبة 2" },
      { value: "مريض مرتبة 3", label: "مريض مرتبة 3" },
      { value: "زرع مفصل", label: "زرع مفصل" },
      { value: "أمراض الدماغ", label: "أمراض الدماغ" },
      { value: "أمراض عصبية", label: "أمراض عصبية" },
      { value: "مريض سكر", label: "مريض سكر" },
      { value: "مريض فقر الدم", label: "مريض فقر الدم" },
      { value: "مريض عصب", label: "مريض عصب" },
      { value: "مريض كبد", label: "مريض كبد" },

{ value: "عصب معدة", label: "عصب معدة" },
      { value: "نقص نمو", label: "نقص نمو" },
      { value: "تفخخ عظام", label: "تفخخ عظام" },
      { value: "تحسس جلدي", label: "تحسس جلدي" },
      { value: "مريض ضغط", label: "مريض ضغط" },
      { value: "خلع ولادة", label: "خلع ولادة" },
      { value: "مريض روماتيزم", label: "مريض روماتيزم" },
      { value: "ضغف سمع شديد", label: "ضغف سمع شديد" },
  ];
  healthOptions.sort((a, b) => a.label.localeCompare(b.label));

  const workoptions = [
      { value:"سمان", label:"سمان" },
      { value:"عاطل", label:"عاطل" },
      { value:"نجار", label:"نجار" },
      { value:"قصاب", label:"قصاب" },
      { value:"موظف", label:"موظف" },
      { value:"عامل نظافة", label:"عامل نظافة" },
      { value:"حلاق", label:"حلاق" },
      { value:"معماري", label:"معماري" },
      { value:"أستاذ", label:"أستاذ" },
      { value:"دهان", label:"دهان" },
      { value:"خياط", label:"خياط" },
      { value:"بلاط", label:"بلاط" },
      { value:"ممدد صحية", label:"ممدد صحية" },
      { value:"آذن", label:"آذن" },
      { value:"بائع جوال", label:"بائع جوال" },
      { value:"مهندس معماري", label:"مهندس معماري" },
      { value:"دكتور", label:"دكتور" },
      { value:"تاجر", label:"تاجر" },
      { value:"صاحب شركة", label:"صاحب شركة" },
      { value:"مبرمج", label:"مبرمج" },
      { value:"رياضي", label:"رياضي" },
      { value:"حداد", label:"حداد" },
      { value:"بائع عقارات", label:"بائع عقارات" },
      { value:"ميكانيكي", label:"ميكانيكي" },
      { value:"رسام", label:"رسام" },
      { value:"مصمم ازياء", label:"مصمم ازياء" },
      { value:"مساعد مهندس", label:"مساعد مهندس" },
      { value:"صيانة سيارات", label:"صيانة سيارات" },
      { value:"بخاخ سيارات", label:"بخاخ سيارات" },
      { value:"بخاخ موبيليا", label:"بخاخ موبيليا" },
      { value:"مصور", label:"مصور" },
      { value:"كهربجي", label:"كهربجي" },
      { value:"معام خاص", label:"معلم خاص" },
      { value:"مطرب", label:"مطرب" },
      { value:"بيع مفروشات", label:"بيع مفروشات" },
      { value:"صائغ ذهب", label:"صائغ ذهب" },
      { value:"محل البسة", label:"محل البسة" },
      { value:"بائع مجوهرات", label:"بائع مجوهرات" },
      { value:"مهندس مدني", label:"مهندس مدني" },
      { value:"خبيرأغذية", label:"خبيرأغذية" },
      { value:"مول", label:"مول" },
      { value:"مذيع", label:"مذيع" },
      { value:"طيار", label:"طيار" },
      { value:"ممثل", label:"ممثل" },
      { value:"مقدم تلفزيوني", label:"مقدم تلفزيوني" },
      { value:"رجل أعمال", label:"رجل أعمال" },
      { value:"تاجر سيارات", label:"تاجر سيارات" },
      { value:"تاجربناء", label:"تاجربناء" },
      { value:"تاجر عقارات", label:"تاجر عقارات" },
      { value:"متعهد بناء", label:"متعهد بناء" },
      { value:"تاجر حديد", label:"تاجر حديد" },
      { value:"مهندس معلوماتية", label:"مهندس معلوماتية" },
      { value:"مهندس ديكور", label:"مهندس ديكور" },
      { value:"عميد كلية", label:"عميد كلية" },
      { value:"ضابط", label:"ضابط" },
      { value:"مدير مدرسة خاصة", label:"مدير مدرسة خاصة" },
      { value:"وزير", label:"وزير" },
      { value:"تاجرأقمشة", label:"تاجرأقمشة" },
      { value:"صواج سيارات", label:"صواج سيارات" },
      { value:"تاجر قطع سيارات", label:"تاجر قطع سيارات" },
      { value:"بدلات", label:"بدلات" },
      { value:"بائع ستائر", label:"بائع ستائر" },
      { value:"تاجر مفروشات", label:"تاجر مفروشات" },
      { value:"تاجر خشب", label:"تاجر خشب" },
      { value:"مهندس", label:"مهندس" },
      
  ];
  workoptions.sort((a, b) => a.label.localeCompare(b.label));

return (
        <>
           {loading && <LoadingSubmit />}
        <Form className="bg-white w-100 mx-2 p-3" onSubmit={HandleSubmit}>
         <Form.Group 
         className="mb-3"
        controlId="exampleForm.ControlInput1"
        >
        <Form.Label>اسم المستفيد:</Form.Label>
        <Form.Control
        ref={focus}
        type="text"
        name="name"
        required
         value={name} 
         onChange={(e) => setName(e.target.value)}   
         placeholder="الاسم.." 
         className="hover_bb"
         />
      </Form.Group>
     <Form.Group 
     className="mb-3" 
     controlId="exampleForm.ControlInput2">
        <Form.Label>الإيميل:</Form.Label>
        <Form.Control
         type="email" 
         name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         placeholder="الإيميل" 
         />
      </Form.Group>
      <Form.Group 
     className="mb-3" 
     controlId="exampleForm.ControlInput2">
        <Form.Label>كلمة المرور:</Form.Label>
        <Form.Control
         type="password" 
         name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         placeholder="كلمة المرور..." 
         />
      </Form.Group>
      <Form.Group 
     className="mb-3" 
     controlId="exampleForm.ControlInput2">
        <Form.Label>رقم المركز:</Form.Label>
        <Form.Control
         type="text" 
         name="center_id"
        value={center_id}
        onChange={(e) => setCenter_id(e.target.value)}
         placeholder="رقم المركز..." 
         />
      </Form.Group>

      {/* <Form.Group 
     className="mb-3" 
     controlId="exampleForm.ControlInput2">
        <Form.Label>Project_Name:</Form.Label>
        <Form.Control
         type="text" 
         name="project_name"
        value={project_name}
        onChange={(e) => setProject_name(e.target.value)}
         placeholder="Project_Name..." 
         />
      </Form.Group> */}
      
      <Form.Group 
     className="mb-3" 
     controlId="exampleForm.ControlInput2">
        <Form.Label>دور المستخدم</Form.Label>
        <Form.Control
         type="text" 
         name="role_id"
        value={role_id}
        onChange={(e) => setRole(e.target.value)}
         placeholder="الدور..." 
         />
      </Form.Group>
      {/* <Form.Group 
     className="mb-3" 
     controlId="exampleForm.ControlInput2">
        <Form.Label>العمل:</Form.Label>
        <Form.Control
         type="text" 
         name="job"
        value={job}
        onChange={(e) => setJob(e.target.value)}
         placeholder="العمل" 
         />
      </Form.Group> */}
       
      <Form.Group 
     className="mb-3" 
     controlId="exampleForm.ControlInput2">
        <Form.Label>عدد أفراد العائلة:</Form.Label>
        <Form.Control
         type="text" 
         name="num_family"
        value={num_family}
        onChange={(e) => setNum_family(e.target.value)}
         placeholder="عدد أفراد العائلة" 
         />
      </Form.Group>
      <Form.Group 
     className="mb-3" 
     controlId="exampleForm.ControlInput2">
        <Form.Label>الراتب الشهري:</Form.Label>
        <Form.Control
         type="text" 
         name="base_pay"
        value={base_pay}
        onChange={(e) => setBase_pay(e.target.value)}
         placeholder="الراتب الشهري.." 
         />
      </Form.Group>
      <Form.Group 
     className="mb-3" 
     controlId="exampleForm.ControlInput2">
        <Form.Label>تاريخ الميلاد:</Form.Label>
        <Form.Control
         type="text" 
         name="birthday"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        placeholder="تاريخ الميلاد.." 
         />

   </Form.Group>
   <Form.Group className="mb-3" controlId="healthStatus">
         <Form.Label>الحالة الصحية :</Form.Label>
         <Form.Control
            type="text" 
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="تاريخ الميلاد.." 
            />
   </Form.Group>

                     {/* <Form.Select
                           // ref={focus}
                           // options={healthOptions}
                           value={state}
                           // name="state"  
                           // placeholder="اختر الحالة الصحية"
                           onChange={(e)=> setState(e.target.value)}>
                        <option disabled value="" >
                           اختر الدور
                           </option>
                     <option value={3}>مدير</option>
                     <option value={1}>مستفيد</option>
                     <option value={2}>متبرع</option>
                     </Form.Select>
         </Form.Group> */}
               
      
      <button disabled={
        name.length > 1 &&
        email.length > 1 &&
        password.length > 6 &&
        role_id !== "" 
        ? false
         : true
    } className="btn btn-primary">حفظ</button>
        </Form>
        </>
    )
}