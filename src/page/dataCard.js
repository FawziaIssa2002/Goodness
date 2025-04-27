import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import phalastin from '../assets/images/Phalestine.web.png';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import eye from '../assets/images/icon-eye.svg';
import Line from './line';
import forijat from '../assets/images/icon-forijat.svg';
import SP from '../assets/images/SP.png';
import user from '../assets/images/users.svg';
import { Axios } from '../Api/axios';

export default function DataCard() {
  const location = useLocation();
  const card = location.state.card;
  const num = Math.round(card.total_donate * 100 / card.total_budget);
  const [role, setRole] = useState(null);
  const id = card.id;

  useEffect(() => {
    Axios.get(`/auth/user-profile`)
      .then((data) => {
        setRole(data.data.role_id);
      })
      .catch((error) => {
        console.log("Error fetching user profile", error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <Card style={{ width: '100%' }}>
        <div className="d-flex">
          <div style={{ paddingRight: '20px', width: '60%' }}>
            <Card.Body>
              <Card.Title>{card.name}</Card.Title>
              <Card.Text>{card.description}</Card.Text>
              <div className="d-grid gap-2">
                {console.log("ID in DataCard: ", id)}
                {role !== 1 ?  
                  <Link className="btn btn-primary" to="/FormDonation" state={{ id }}>تبرع الآن</Link>
                  : <Link className="btn btn-primary" to="/register" state={ card }>التسجيل للاستفادة</Link>
                }
              </div>
              <div className="money">
                <p className="card-spacer-x pdisb"><small className="card-spacer-x" style={{ textAlign: 'left' }}>المبلغ المتبقي : <small style={{ color: ' red' }}>{card.total_budget - card.total_donate} ل.س</small></small></p>
                <p className="card-text pdisb"><small className="text-muted" style={{ textAlign: 'right' }}> تم جمع : {card.total_donate} ل.س </small></p>
              </div>
              <div className="Linecolor">
                <Line num={num} className="Linecolor" />
              </div>
            </Card.Body>
            <div className='listGroup' style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <ListGroup className="my-2" style={{ backgroundColor: '#f2f2f2', width: '45%' }}>
                <ListGroup.Item className="w-100 p-2 text-center" style={{ backgroundColor: '#f2f2f2' }}> عدد عمليات التبرع {card.total_donate / 10000} عملية
                  <img src={SP} className="img-fluid rounded-start classEye" />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="my-2" style={{ backgroundColor: '#f2f2f2', width: '45%' }}>
                <ListGroup.Item className="w-100 p-2 text-center" style={{ backgroundColor: '#f2f2f2' }}> عدد المستفيدين {card.total_donate / 500000} حتى الآن
                  <small> العدد المستهدف {card.target} مستفيد </small>
                  <img src={user} className="img-fluid rounded-start classEye" />
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
          <div style={{ width: '70%' }}>
            <Card.Img variant="end" src={require(`../backEnd/charity/public/img/project/${card.image}`)} style={{ width: '100%', borderRadius: '5%', paddingBottom: '10px', paddingTop: '-10px', paddingRight: '20px' }} />
          </div>
        </div>
      </Card>
    </div>
  );
}
