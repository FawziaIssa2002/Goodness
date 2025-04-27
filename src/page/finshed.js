import axios from "axios";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import "../AppForMe.css";
import Cycle from './cycle';
import Line from './line';
import back from '../assets/images/back1.jpg';
import Trail from "./trail";
import Quran1 from "./quran copy";

export default function Finshed () {
  const baseURL = 'http://127.0.0.1:8000'; // تعريف عنوان الباك
  const [cardsData, setCardsData] = useState([]);
  const [donate, setDonate] = useState(0);

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
          setCardsData(data);  // تخزين البيانات كمصفوفة مباشرة
          
          // حساب مجموع التبرعات
          const totalDonation = data.reduce((acc, project) => acc + project.total_donate, 0);
          setDonate(totalDonation);  // تعيين مجموع التبرعات
        } else {
          console.error('Failed to fetch projects');
        }
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []); // التابع الفارغ يعني أن التأثير سيتم استدعاؤه مرة واحدة فقط عند التحميل الأول

  const card = cardsData.filter(card => card.finish === 1);
  const helpProjects = card.filter(card => card.class_id === 1);
  const EasyProjects = card.filter(card => card.class_id === 2);
  const FreeProjects = card.filter(card => card.class_id === 3);

  return (
    <div>
      <Quran1 />
      {/* helpProjects */}
      <div className='cardMain' style={{ width: '100%' }}>
        <Row xs={1} sm={2} md={3} className="g-4">
          {helpProjects.map((card, idx) => (
            <Col key={idx}>
              <Card className="card-equal-height">
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
                      <img src={require(`../backEnd/charity/public/img/project/${card.tag}`)} height={100} className='tag' alt="Tag" />
                      <br />
                      {card.target}
                    </Col>
                    <Col className='text-center2'>
                      المبلغ الهدف {card.total_budget} ل.س
                      <Cycle num={Math.floor(card.total_donate * 100 / (card.total_budget || 200))} />
                      <p className='total_donate'>تم جمع {card.total_donate || 200} ل.س</p>
                    </Col>
                    <div>
                      <p className='total_donate' style={{ color: '#26544e', fontSize: '18px' }}>{card.description}</p>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
              {/* <div className="card-footer text-muted" style={{paddingBottom: '-20px'}}>
                <p>{formatDistanceToNow(new Date(card.created_at))}</p>
              </div> */}
            </Col>
          ))}
        </Row>
      </div>
      
      {/* EasyProjects */}
      <div className='cardMain' style={{ width: '100%' , paddingTop: '20px'}}>
        <Row xs={1} sm={2} md={3} className="g-4">
          {EasyProjects.map((card, idx) => (
            <Col key={idx}>
              <Card className="card-equal-height">
                <Card.Img
                  variant="top"
                  src={require(`../backEnd/charity/public/img/project/${card.image}`)}
                  style={{ width: '', margin: 'auto' }}
                  alt={card.name}
                />
                <Card.Body>
                  <Card.Title>{card.name}</Card.Title>
                  <Line num={Math.floor(card.total_donate * 100 / card.total_budget)} />
                  <Card.Text>{card.description}</Card.Text>
                  <Card.Text><small className="text-muted"></small></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      
      {/* FreeProjects */}
      <div className='cardMain' style={{ width: '100%' , paddingTop: '20px'}}>
        <Row xs={1} sm={2} md={3} className="g-4">
          {FreeProjects.map((card, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img src={back} alt="Card image" style={{ height: "300px", objectFit: "cover" }} />
                <Card.ImgOverlay className='textwithImg justify-content-center align-items-center' style={{ padding: "50px" }}>
                  <Card.Text className="fs-4" style={{color: 'white', fontWeight: 'initial'}}>
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
                      {/* <Link 
                        className="btn btn-primary" 
                        to={`/DataCardFree/${card.id}`} 
                        state={{ card }}
                        // style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        عرض التفاصيل الإضافية
                      </Link> */}
                    </div>
                  </Row>
                </Card.Body>
              {/* <div className="card-footer text-muted">
                منذ يومين
              </div> */}
            </Col>
          ))}
        </Row>
      </div>
      <Trail totalDonation={donate} />
    </div>
  );
}
