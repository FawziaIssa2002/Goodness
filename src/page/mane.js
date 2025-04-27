import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Easy from './eazy';
import Help from './Help';
import Free from './free';
import filter from '../assets/images/filter.png'
import OtherProjects from './Others';
import Others from './Others';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Actions from './Actions';
const baseURL = 'http://127.0.0.1:8000'; // تعريف عنوان الباك

export default function Main() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/projects`)
      .then(response => {
        if (response.status === 200) {
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

  const helpProjectss = cardsData.filter(card => card.class_id === 1);
  const helpProjects = helpProjectss.filter(card => card.finish === 0);

  const EasyProjectss = cardsData.filter(card => card.class_id === 2);
  const EasyProjects = EasyProjectss.filter(card => card.finish === 0);

  const FreeProjectss = cardsData.filter(card => card.class_id === 3);
  const FreeProjects = FreeProjectss.filter(card => card.finish === 0);

  const actionsProjects = cardsData.filter(card => card.class_id === 4);
  const othersProjects  = cardsData.filter(card => card.class_id !== 3 && card.class_id !== 2 && card.class_id !== 1 && card.class_id !== 4);


  // const OtherProjects1  = OtherProjects.filter(card => card.finish === 0 );

  return (
    <div>
      {/* <Link to={'/Filter'} > */}
        {/* <Card>
          <Card.Img 
            variant="top"
            src={filter}
            style={{ width: '20px', margin: 'auto' }} ></Card.Img>
        </Card>
      </Link> */}
      {/* <image src='filter' /> */}
      <p className='title2'>إغاثة ملهوف</p>
      <Help helpProjects={helpProjects} />
      <br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/>
      <p className='title2'>تيسرت</p>
      <Easy EasyProjects={EasyProjects} />
      <br/><br/><br/><br/><br/>
      <p className='title2'>فرجت</p>
      <Free FreeProjects={FreeProjects} />
      <br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/>
      <p className='title2'>مبادرات</p>
      <Actions actionsProjects={actionsProjects} />
      <br/><br/><br/><br/><br/>
      <p className='title2'>مشاريع أخرى</p>
      <Others othersProjects={othersProjects} />
    </div>
  );
}