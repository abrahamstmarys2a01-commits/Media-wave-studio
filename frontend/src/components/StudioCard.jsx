import React from 'react';

const StudioCard = ({ image, title, capacity, description, price, isPopular, onBookNow }) => {
  return (
    <div className="studio-card">
      <div className="studio-card-image-container">
        {isPopular && <span className="popular-badge">Popular</span>}
        <img src={image} alt={title} className="studio-card-image" />
      </div>
      <div className="studio-card-content">
        <h3 className="studio-card-title">{title}</h3>
        <div className="studio-card-capacity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-people">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          {capacity}
        </div>
        <p className="studio-card-description">{description}</p>
        <div className="studio-card-footer" style={{ justifyContent: 'flex-end' }}>
          <button className="btn-outline btn-sm" onClick={onBookNow}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default StudioCard;
