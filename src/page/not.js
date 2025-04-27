// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// const baseURL = 'http://127.0.0.1:8000'; // تعريف عنوان الباك

// const Container = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 20px;
//   padding: 20px;
// `;

// const Card = styled.div`
//   background: #fff;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   padding: 20px;
//   max-width: 300px;
//   width: 100%;
//   text-align: center;
//   transition: transform 0.2s;

//   &:hover {
//     transform: translateY(-10px);
//   }
// `;

// const CardText = styled.p`
//   font-size: 1.2em;
//   color: #333;
// `;

// const Title = styled.h1`
//   text-align: center;
//   margin-bottom: 20px;
//   font-size: 2.5em;
//   color: #444;
// `;

// export default function Not() {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     axios.get(`${baseURL}/api/donation`)
//       .then(response => {
//         if (response.status === 200) {
//           const data = response.data.data;
//           const filteredNotes = data
//             .filter(donation => donation.note !== null)
//             .map(donation => ({
//               id: donation.id,
//               note: donation.note
//             }));
//           setNotes(filteredNotes);
//         } else {
//           console.error('Failed to fetch donations');
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching donations:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <Title>Notes</Title>
//       <Container>
//         {notes.map(note => (
//           <Card key={note.id}>
//             <CardText>{note.note}</CardText>
//           </Card>
//         ))}
//       </Container>
//     </div>
//   );
// }
