import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbarr from './page/nav';
import Quran from './page/quran';
import Main from './page/mane'
import DataCard from './page/dataCard';
import Easy from './page/eazy';
import Help from './page/Help';
import FormDonation from './page/FormDonation';
import Free from './page/free';
import Map from './page/map';
import DataCardFree from './page/DataCardFree';
import Filter from './page/filter';
// لروضة
import HomePage from './Pages/Website/HomePage';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Users from './Pages/Dashboard/Users';
import Dashboard from './Pages/Dashboard/Dashboard';
import "./Components/Dashboard/bars.css"
// import RequireAuth from './Pages/Auth/RequireAuth';
import User from './Pages/Dashboard/User';
import AddUser from './Pages/Dashboard/AddUser';
import Err403 from './Pages/Auth/403';
import Writer from './Pages/Dashboard/Writer';
import Err404 from './Pages/Auth/404';
import RequireBack from './Pages/Auth/RequireBack';
import Categories from './Pages/Dashboard/Categories';
import AddCategory from './Pages/Dashboard/AddCategory';
import Category from './Pages/Dashboard/Category';
import Products from './Pages/Dashboard/Projects';
import AddProduct from './Pages/Dashboard/AddProject';
import Donners from './Pages/Dashboard/Donners';
import Centers from './Pages/Dashboard/Centers';
import AddCenter from './Pages/Dashboard/AddCenter';
import Banks from './Pages/Dashboard/Banks';
import Projects from './Pages/Dashboard/Projects';
import AddProject from './Pages/Dashboard/AddProject';
import AddBank from './Pages/Dashboard/AddBank';
import Center from './Pages/Dashboard/Center';
import Project from './Pages/Dashboard/Project';
import Bank from './Pages/Dashboard/Bank';
import { Axios } from './Api/axios';
import Information from './page/information';
import Finshed from './page/finshed';
import Trail from './page/trail';
import Others from './page/Others';
import FormRegistry from './page/FormRegistry';
import Respons from './page/respons';
import Actions from './page/Actions';

const baseURL = 'http://127.0.0.1:8000'; // تعريف عنوان الباك

function App() {
  const [cardsData, setCardsData] = useState([]);
  // console.log(cardsData)
  useEffect(() => {
    axios.get(`${baseURL}/api/projects`)
      .then(response => {
        if (response.status === 200) {
          // console.log(response)
          const data = response.data.data.map(project => ({
            id: project.id,
            image: project.image,
            name: project.name,
            description: project.description,
            tag: project.tag,
            target: project.target,
            total_benifit: project.total_benifit,
            benefits_count: project.benefits_count,
            total_budget: project.total_budget,
            total_donate: project.total_donate,
            finish: project.finish,
            created_at: project.created_at,
            class_id: project.class_id
          }));
          // console.log("Fetched data: ", data);
          setCardsData(data);  // تخزين البيانات كمصفوفة مباشرة
        } else {
          console.error('Failed to fetch projects');
        }
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const helpProjects  = cardsData.filter(card => card.class_id === 1);
  const helpProjects1 = helpProjects.filter(card => card.finish === 0);
  // const helpProjects2 = helpProjects.filter(card => card.finish === 1);

  const EasyProjects  = cardsData.filter(card => card.class_id === 2);
  const EasyProjects1 = EasyProjects.filter(card => card.finish === 0);
  // const EasyProjects2 = EasyProjects.filter(card => card.finish === 1);

  const FreeProjects  = cardsData.filter(card => card.class_id === 3);
  const FreeProjects1 = FreeProjects.filter(card => card.finish === 0);
  // const FreeProjects2 = FreeProjects.filter(card => card.finish === 1);

  const ActionsProjects = cardsData.filter(card => card.class_id === 4);
  const OthersProjects  = cardsData.filter(card => card.class_id !== 3 && card.class_id !== 2 && card.class_id !== 1 && card.class_id !== 4);


  const [role, setRole] = useState(null);
  useEffect(() => {
    Axios.get(`/auth/user-profile`)
      .then((data) => {
        setRole(data.data.role_id);
      })
      .catch((error) => {
      });
  }, []);
  return (
    <div className='App'>
      {role !== 3 &&
      <Navbarr />}
      {role !== 3  &&
      <Quran />}
      {/* <Router> */}
        <Routes>
          <Route path="/"   element={<Main />} />
          <Route path="/FormDonation"  element={<FormDonation />} />
          <Route path='/help' element={<Help helpProjects={helpProjects1} />} />
          <Route path="/Easy" element={<Easy EasyProjects={EasyProjects1} />} />
          <Route path='/Free' element={<Free FreeProjects={FreeProjects1} />} />
          <Route path="/DataCard/:id" element={<DataCard />} />
          <Route path="/DataCardFree/:id" element={<DataCardFree />} />
          <Route path="/map" element={<Map />} />
          <Route path="/information" element={<Information />} />
          <Route path="/finshed" element={<Finshed  />} />
          <Route path="/Filter" element={<Filter />} />
          <Route path="/register" element={<FormRegistry />} />
          <Route path="/respons" element={<Respons />} />
          <Route path='/Actions' element={<Actions actionsProjects={ActionsProjects}  />} />
          <Route path='/Others' element={<Others othersProjects={OthersProjects}  />} />
          
          {/* لروضة */}
      <Route element={<RequireBack />}>
      <Route path="/login" element={<Login />} />
      </Route>

     {role===3 &&
      <Route path="/dashboard" element={<Dashboard />} >
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<User />} />
        <Route path="user/add" element={<AddUser />} />

        <Route path="categories" element={<Categories />} />
        <Route path="categories/:id" element={<Category />} />
        <Route path="category/add" element={<AddCategory />} />
         {/* Products */}
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<Project />} />
        <Route path="project/add" element={<AddProject />} />
        {/* Centers */}
        <Route path="centers" element={<Centers />} />
        <Route path="centers/:id" element={<Center/>} />
        <Route path="center/add" element={<AddCenter />} />
        {/* Donners */}
        <Route path="donners" element={<Donners />} />
        {/* Banks */}
        <Route path="banks" element={<Banks />} />
        <Route path="banks/:id" element={<Bank />} />
        <Route path="bank/add" element={<AddBank />} />
        

        <Route path="writer" element={<Writer />} />
        {/* </Route> */}
        
      </Route>
}
        </Routes>
      <Trail />
    </div>
  );
}

export default App;
