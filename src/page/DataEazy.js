import React from 'react';
import { Link } from 'react-router-dom';
import Line from './line';
import { formatDistanceToNow } from 'date-fns';

export default function DataEazy({ EasyProjectss, role }) {
  const cardGroupStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '20px' // مسافة بين العناصر
  };

  const cardItemStyle = {
    flex: '1 1 calc(33.333% - 20px)',
    boxSizing: 'border-box',
    marginBottom: '20px',
    border: '1px solid #ccc', // إطار رمادي
    padding: '10px', // مسافة داخل الإطار
    borderRadius: '5px' // زوايا الإطار
  };

  const cardImageStyle = {
    width: '100%',
    height: 'auto'
  };

  return (
    <div style={cardGroupStyle}>
      {Array.isArray(EasyProjectss) && EasyProjectss.map((card, idx) => (
        <div key={idx} style={cardItemStyle}>
          <Link 
            to={`/DataCard/${card.id}`} 
            state={{ card }} 
            role={role}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img 
              src={require(`../backEnd/charity/public/img/project/${card.image}`)} 
              style={cardImageStyle} 
              className="card-img-top" 
              alt="..." 
            />
            <Line num={Math.floor(card.total_donate * 100 / card.total_budget)} />
            <div className="card-body">
              <h5 className="card-title">{card.name}</h5>
              <p className="card-text">{card.description}</p>
              <p className="card-text"><small className="text-muted"></small></p>
            </div>
          </Link>
          <div className="card-footer text-muted">
              <p>{formatDistanceToNow(new Date(card.created_at))} </p>
            </div>
        </div>
      ))}
    </div>
  );
}
