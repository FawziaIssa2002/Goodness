// import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useState, useEffect, useRef } from 'react';
import "../AppForMe.css"

function Cycle(props) {

  const canvasRef = useRef(null);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas) {
          setCanvasReady(true);
      }
  }, []);

  useEffect(() => {
      if (canvasReady) {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          const radius = 27; //حجم الدائرة
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const filledPercentage = (props.num / 100) * (Math.PI * 2);

          // رسم الدائرة
          // context.beginPath();
          context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
          context.lineWidth = 5; // عرض خط الدائرة
          context.strokeStyle = '#D3D3D3'; // لون خط الدائرة
          context.stroke();

          // رسم السائل داخل الدائرة
          context.beginPath();
          context.arc(centerX, centerY, radius, -Math.PI / 2, filledPercentage - Math.PI / 2, false);
          context.lineWidth = 5; // عرض السائل
          context.strokeStyle = '#4FA095'; // لون السائل
          context.stroke();

          // كتابة النسبة المئوية في وسط الدائرة
          context.fillStyle = '#000';
          context.font = '20px Arial';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(props.num + '%', centerX, centerY);
      }
  }, [canvasReady, props.num]);

  return (
      <canvas ref={canvasRef} width="100" height="100" className='cycle' ></canvas>
  );
}

export default Cycle;
