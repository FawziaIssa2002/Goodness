import React from 'react';
import '../App.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import eye from '../assets/images/icon-eye.svg';
import Line from './line';
function Project(){
return(
    <div>
        <div class="card mb-3">
         <div class="row g-0">
          <div class="col-md-4">
            {/* <img src={boy} class="img-fluid rounded-start" alt="..."  /> */}
          </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">الكفالة السنوية للأيتام</h5>
        <p class="card-text">أيتام فقراء يعانون من بعد وفاة الأب وفقدان مصدر الأمان، وبحاجة إلى مستلزمات الحياة الأساسية والنفقة، تبرعك سيساهم في كفالتهم وتوفير حياة كريمة ومستقرة لهم.</p>
        {/* <p class="card-text"><small class="text-muted">السودان، تركيا، سوريا، لبنان، مالي، وغيرها</small></p> */}
        <div class="d-grid gap-2">
             <button class="btn btn-primary" type="button">تبرع الآن</button>
        </div>
        <div className="money">
            <p className="card-text pdisb" ><small className="text-muted"style={{textAlign: 'right'}} > تم جمع : 75,000 ل.س </small></p>
            <p className="card-spacer-x pdisb" ><small className="card-spacer-x" style={{textAlign: 'left' }} >المبلغ المتبقي : <small style={{ color: ' red'}}>25,000 ل.س</small></small></p>
        </div>
        <br/>
        <div className='selectForm'>
        اختر الفئة
        <Form.Select aria-label="Default select example">
      <option value="1">1000 ل.س</option>
      <option value="2">10,000 ل.س</option>
      <option value="3">100,00 ل.س</option>
    </Form.Select>
    </div>
    <br/>
    <br/>
        <div >
          <br/>
        <Line num={75}  />
        </div>
        <div className='listGroup'>
      {['xxl'].map((breakpoint) => (
        <ListGroup key={breakpoint} horizontal={breakpoint} className="my-2">
          <ListGroup.Item> الزيارات 3551 زيارة
          <img src={eye} class="img-fluid rounded-start classEye" alt="..."  />

          </ListGroup.Item>
          <ListGroup.Item>renders horizontally</ListGroup.Item>
          <ListGroup.Item>on {breakpoint}</ListGroup.Item>
          <ListGroup.Item>and above!</ListGroup.Item>
        </ListGroup>
      ))}
    </div>
      </div>
    </div>
  </div>
</div>

    </div>
);
}
export default Project;
