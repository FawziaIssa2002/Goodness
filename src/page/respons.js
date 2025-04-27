import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Respons() {
  const [result, setResult] = useState(null);
  const [data, setData] = useState([]);
  const location = useLocation();
  const id = location.state ? location.state.id : null;
  const baseURL = 'http://127.0.0.1:8000'; // تعريف عنوان الباك

  useEffect(() => {
    if (id) {
      axios.get(`${baseURL}/api/info/${id}`)
        .then(response => {
          const fetchedData = response.data.data;
          // ضبط البيانات على الحالة
          setData(fetchedData);
          // console.log("Fetched data:", fetchedData);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [id]);

  const getStateWeight = (state) => {
    switch (state) {
      case 'سليم':
        return 1;
      case 'مريض مرتبة ١':
        return 2;
      case 'مريض مرتبة ٢':
        return 3;
      case 'مريض مرتبة ٣':
        return 4;
      case 'زرع مفاصل':
        return 7;
      case 'مصاب حرب':
        return 11;
      case 'فشل كبدي':
        return 12;
      case 'مبتور قدم يسرى':
        return 13;
      case 'مبتور قدم يمنى':
        return 18;
      case 'مريض كلى':
        return 19;
      case 'صرع':
        return 20;
      case  'امراض جهازية':
        return 21;
      case 'عاجز بشكل جزئي':
        return 28;
      case 'اعمى يسار':
        return 29;
      case 'اعمى يمين':
        return 30;
      case 'اصم':
        return 31;
      case 'مبتور قدمين':
        return 32;
      case 'مريض قسم داخلية':
        return 33;
      case 'مبتور يد يسرى':
        return 36;
      case 'شلل نصفي':
        return 37;
      case 'مريض سرطان':
        return 38;
      case 'مريض قلب':
        return 39;
      case 'اعمى':
        return 40;
      case 'مبتور يد يمنى':
        return 41;
      case 'امراض دماغ':
        return 43;
      case 'امراض عصبية':
        return 45;
      case 'مبتور اليدين':
        return 48;
      case 'جنون':
        return 49;
      case 'شلل كامل':
        return 51;
      default:
        return 25;
    }
  };

  const handlePredict = () => {
    // افترض أن هناك بيانات تحتاج إلى إرسالها للتنبؤ
    const predictionData = {
      num_family: data.num_family,
      base_pay: data.base_pay,
      birthday: data.birthday,
      state: getStateWeight(data.state)  // استخدام التثقيل المناسب حسب الحالة
    };
    console.log(predictionData);

    axios.post(`http://127.0.0.1:5000/predict`, predictionData)
      .then(response => {
        setResult(response.data.result);
      })
      .catch(error => {
        console.error('Error making prediction:', error);
      });
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handlePredict}>التأكد</button>
      {result !== null && (
        <p>{result ? 'تم القبول' : 'لم يتم القبول'}</p>
      )}
    </div>
  );
}

export default Respons;
