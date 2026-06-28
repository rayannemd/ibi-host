// components/InfoCard.jsx
import React from 'react';
import './InfoCard.css'
const InfoCard = ({ title, value }) => (
  <div className="infoCard">
    <span className="cardTitle">{title}</span>
    <span className="cardValue">{value}</span>
  </div>
);

export default InfoCard;
