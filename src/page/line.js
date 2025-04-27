import ProgressBar from 'react-bootstrap/ProgressBar';


export default function Line(props) {
  const num = props.num;
  return <ProgressBar now={num} label={`${num}%`} variant="success" style={{height: '20px' , paddingTop: '3px' }}  />; 
}

// export default Line;


