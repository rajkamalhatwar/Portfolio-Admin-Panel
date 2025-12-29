import React from 'react'

 

const Button = ({ type = "button", label, className = "", onClick }) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

 


export default Button
