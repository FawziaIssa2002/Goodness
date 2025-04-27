import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import "../AppForMe.css"
import Cycle from './cycle';
import { formatDistanceToNow } from 'date-fns';

function Others({ othersProjects }) {
  const localTime = new Date();

  return (
    <div className='cardMain' style={{ width: '100%' }}>
      <Row xs={1} sm={2} md={3} className="g-4">
        {othersProjects.map((card, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img
                variant="top"
                src={require(`../backEnd/charity/public/img/project/${card.image}`)}
                style={{ width: '', margin: 'auto' }}
                alt={card.name}
              />
              <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <Row className='text-center text-decoration-none'>
                  <Col className='text-decoration-none'>
                    الفئة المستهدفة
                    <br />
                    {/* <img src={require(`../backEnd/charity/public/img/project/${card.tag}`)} height={100} className='tag' alt="Tag" /> */}
                    <br />
                    {card.target}
                  </Col>
                  <Col className='text-center2'>
                  {/* {console.log(card)} */}
                    {/* عدد المستفيدين {card.total_benifit} شخص */}
                    {/* <br /> */}
                    المبلغ الهدف {card.total_budget} ل.س
                    <Cycle num={Math.floor(card.total_donate * 100 / (card.total_budget || 200))} />
                 <p className='total_donate'>  تم جمع {card.total_donate || 200} ل.س   </p> 
                  </Col>
                  <div >
                    <Link   
                      className="btn btn-primary" 
                      to={`/DataCard/${card.id}`} 
                      state={{ card }}
                    >
                      عرض التفاصيل الإضافية
                    </Link>
                  </div>
                </Row>
              </Card.Body>
            </Card>
            <div className="card-footer text-muted">
              <p>{formatDistanceToNow(new Date(card.created_at))} </p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Others;

