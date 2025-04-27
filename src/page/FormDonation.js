import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, InputGroup, Button, Alert, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

export default function FormDonation() {
  const location = useLocation();
  const id = location.state ? location.state.id : null;

  useEffect(() => {
    if (id) {
      console.log("ID in FormDonation: ", id);
    } else {
      console.log("No ID found in location state.");
    }
  }, [id]);

  // console.log("ID in FormDonation (outside useEffect): ", id);

  const baseURL = 'http://127.0.0.1:8000';
  const [bank, setBank] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [note, setNote] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/api/banks`)
      .then(response => {
        if (response.status === 200) {
          const data = response.data.data.map(bank => ({
            id: bank.id,
            name: bank.name,
          }));
          setBank(data);
        } else {
          console.error('Failed to fetch banks');
        }
      })
      .catch(error => {
        console.error('Error fetching banks:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fullName && donationAmount && selectedBank) {
      setValidated(true);
      setShowAlert(false);

      axios.post(`${baseURL}/api/donation/${id}`, {
        name: fullName,
        email: email,
        amount: donationAmount,
        bank_id: selectedBank,
        note: note
      })
      .then(response => {
        if (response.status === 201) {
          setInvoiceNumber(response.data.data.number);
          setShowInvoice(true);
        } else {
          console.error('Failed to submit donation');
        }
      })
      .catch(error => {
        console.error('Error submitting donation:', error);
      });

    } else {
      setValidated(false);
      setShowAlert(true);
    }
  };

  const selectedBankName = bank.find(b => b.id === parseInt(selectedBank))?.name;

  return (
    <div className='ForminArabic'>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            required
            placeholder="الاسم الكامل"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ borderColor: !fullName && !validated ? 'red' : '' }}
          />
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control.Feedback type="invalid">
            الرجاء إدخال الاسم الكامل.
          </Form.Control.Feedback>
        </InputGroup>

        <InputGroup className="mb-3 leftToRightItem">
          <Form.Control
            type="email"
            placeholder="الايميل"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
          <Form.Control.Feedback type="invalid">
            الرجاء إدخال الإيميل.
          </Form.Control.Feedback>
        </InputGroup>

        <div className='selectForm'>
          <p className='textTop'>اختر فئة التبرع</p>
          <Form.Select
            required
            aria-label="Default select example"
            className='leftToRightItem'
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            style={{ borderColor: !donationAmount && !validated ? 'red' : '' }}
          >
            <option value="">اختر مبلغ التبرع</option>
            <option value="1000">1000 ل.س</option>
            <option value="10000">10,000 ل.س</option>
            <option value="100000">100,000 ل.س</option>
            <option value="1000000">1,000,000 ل.س</option>
            <option value="10000000">10,000,000 ل.س</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            الرجاء اختيار فئة التبرع.
          </Form.Control.Feedback>
          <br />
        </div>

        <div className='selectForm'>
          <p className='textTop'>اختر البنك</p>
          <Form.Select
            required
            aria-label="Default select example"
            className='leftToRightItem'
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            style={{ borderColor: !selectedBank && !validated ? 'red' : '' }}
          >
            <option value="">اختر البنك</option>
            {bank.map((bb, idx) => (
              <option key={idx} value={bb.id}>{bb.name}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            الرجاء اختيار البنك.
          </Form.Control.Feedback>
          <br />
        </div>

        <InputGroup>
          <InputGroup.Text>إذا كان لديك ملاحظة رجاء أخبرنا🤗</InputGroup.Text>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </InputGroup>

        {showAlert && (
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            يرجى ملء الحقول المطلوبة
          </Alert>
        )}

        <div className="d-grid gap-2">
          <Button type="submit" className="btn btn-primary">
            اظهار الفاتورة
          </Button>
        </div>
      </Form>

      {showInvoice && validated && (
        <Card className="mt-5">
          <Card.Header as="h5">تفاصيل الفاتورة</Card.Header>
          <Card.Body>
            <Card.Title>رقم فاتورتك: {invoiceNumber}</Card.Title>
            <Card.Text>
              <strong>الاسم الكامل:</strong> {fullName}<br />
              <strong>الايميل:</strong> {email}<br />
              <strong>فئة التبرع:</strong> {donationAmount} ل.س<br />
              <strong>البنك:</strong> {selectedBankName || ''}<br />
              <strong>ملاحظتك:</strong> {note || 'لا توجد ملاحظات'}<br />
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item className='text-center'>الرجاء الانتقال للتطبيق من أجل التسديد</ListGroup.Item>
          </ListGroup>
        </Card>
      )}
    </div>
  );
}
