import React, { useState ,useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Line from './line';
import SP from '../assets/images/SP.png';
import user from '../assets/images/users.svg';
import { Link } from 'react-router-dom';
import back from '../assets/images/back1.png';
import { Axios } from '../Api/axios';

export default function DataCardFree() {
  const { id } = useParams();
  const location = useLocation();
  const card = location.state.card;
  const num = Math.round(card.total_donate * 100 / card.total_budget);
  const [role, setRole] = useState(null);
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
            {console.log(card)}
            <Card.Body>
              <Card.Title>{card.name}</Card.Title>
              <Card.Text style={{fontSize: '30px'}}>{card.description}</Card.Text>
              <div className="d-grid gap-2">
                {/* <Link className="btn btn-primary" to="/FormDonation" state={ card }>تبرع الآن</Link> */}
                {role !== 1 ?  
                  <Link className="btn btn-primary" to="/FormDonation" state={{ id }}>تبرع الآن</Link>
                  : <Link className="btn btn-primary" to="/register" state={ card }>التسجيل للاستفادة</Link>
                }
              </div>
              <div className="money">
                <p className="card-spacer-x pdisb"><small className="card-spacer-x" style={{ textAlign: 'left' }}>المبلغ المتبقي : <small style={{ color: 'red' }}>{card.total_budget - card.total_donate} ل.س</small></small></p>
                <p className="card-text pdisb"><small className="text-muted" style={{ textAlign: 'right' }}> تم جمع : {card.total_donate} ل.س </small></p>
              </div>
              <div className="Linecolor">
                <Line num={num} className="Linecolor" />
              </div>
            </Card.Body>

          </div>
          <div style={{ width: '70%' }}>
          <div className='listGroup' style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <ListGroup className="my-2 listGroup" style={{ backgroundColor: '#f2f2f2', width: '45%' }}>
                <ListGroup.Item className="w-100 p-2 text-center listGroup" style={{ backgroundColor: '#f2f2f2' }}>
                <p className='card-target '>  عدد عمليات التبرع {card.total_donate} عملية </p> 
                  <img src={SP} className="img-fluid rounded-start classEye " />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="my-2 listGroup" style={{ backgroundColor: '#f2f2f2', width: '45%' }}>
                <ListGroup.Item className="w-100 p-2 text-center listGroup" style={{ backgroundColor: '#f2f2f2' }}>
              <p className='card-target '>  العدد المستهدف {card.benefits_count }  مستفيد </p>  
                  <img src={user} className="img-fluid rounded-start classEye " />
                </ListGroup.Item>
              </ListGroup>
              {/* <br/> */}
              <ListGroup className="my-2 listGroup" style={{ backgroundColor: '#f2f2f2', width: '45%' }}>
                <ListGroup.Item className="w-100 p-2 text-center listGroup" style={{ backgroundColor: '#f2f2f2' }}>
              <p className='card-target '>  حتى الان تم نزويد{card.target}  مستفيد </p>  
                  <img src={user} className="img-fluid rounded-start classEye " />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="my-2 listGroup" style={{ backgroundColor: '#f2f2f2', width: '45%' }}>
                <ListGroup.Item className="w-100 p-2 text-center listGroup" style={{ backgroundColor: '#f2f2f2' }}>
              <p className='card-target '>  حتى الان تم نزويد{card.target}  مستفيد </p>  
                  <img src={user} className="img-fluid rounded-start classEye " />
                </ListGroup.Item>
              </ListGroup>
            </div>
            {/* <Card.Img variant="end" src={require(`../backEnd/charity/public/img/project/${card.image}`)} style={{ width: '100%', borderRadius: '5%' }} /> */}
            {/* <p className="card-text" style={{ textAlign: 'center' }}><small className="text-muted">السودان، تركيا، سوريا، لبنان، مالي، وغيرها</small></p> */}
          </div>
        </div>
      </Card>
    </div>
  );
}
