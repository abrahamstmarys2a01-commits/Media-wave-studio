import React from 'react';

const FeatureIcon = ({ icon, title, description }) => {
  return (
    <div className="feature-item">
      <div className="feature-icon-wrapper">
        {icon}
      </div>
      <div className="feature-content">
        <h4 className="feature-title">{title}</h4>
        <p className="feature-description">{description}</p>
      </div>
    </div>
  );
};

export default FeatureIcon;
