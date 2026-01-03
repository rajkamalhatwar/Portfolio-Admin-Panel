import React from 'react'

const Input = ({
  label,
  type = "text",
  name,
  value, 
  placeholder,
  className = '',
  required = false,    
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label>
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}

      <input
        type={type}
        className={`form-control ${className}`}
        name={name} 
        placeholder={placeholder}
        required={required}    
        {...props}
      />
    </div>
  );
};

export default Input
