import React from 'react';
import Card from 'react-bootstrap/Card';
import back from '../assets/images/back1.jpg';
import Line from "./line";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export default function DataFree({ FreeProjects }) {
  return (
    <div className='cardMain' style={{ width: '100%' }}>
      <Row xs={1} sm={2} md={3} className="g-4">
        {FreeProjects.map((card, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img src={back} alt="Card image" style={{ height: "300px", objectFit: "cover" }} />
              <Card.ImgOverlay className='textwithImg justify-content-center align-items-center' style={{ padding: "50px" }}>
                <Card.Text className="fs-4" style={{color : 'white', fontWeight: 'lighter'}}>
                  {card.description}
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
              <Line num={Math.floor(card.total_donate * 100 / card.total_budget)} />
              <Card.Body>
                <Row className='text-center text-decoration-none'>
                  <Col className='text-center2'>
                    <br />
                    تم جمع {card.total_donate} ل.س
                  </Col>
                  <div >
                    <Link 
                      className="btn btn-primary" 
                      to={`/DataCardFree/${card.id}`} 
                      state={{ card }}
                      // style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      عرض التفاصيل الإضافية
                    </Link>
                  </div>
                </Row>
              </Card.Body>
            <div className="card-footer text-muted">
              <p>{formatDistanceToNow(new Date(card.created_at))} </p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
