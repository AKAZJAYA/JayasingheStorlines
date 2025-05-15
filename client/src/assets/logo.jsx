import React from 'react';

const Logo = ({ className = "", height = "40" }) => {
  return (
    <svg 
      width="auto" 
      height={height} 
      viewBox="0 0 240 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M10 10H50V50H10V10Z" fill="#0055b8"/>
      <path d="M60 10H230V25H60V10Z" fill="#0055b8"/>
      <path d="M60 35H180V50H60V35Z" fill="#0055b8"/>
      <circle cx="200" cy="42" r="8" fill="#dc3545"/>
      <circle cx="220" cy="42" r="8" fill="#ffc107"/>
    </svg>
  );
};

export default Logo;