import React from 'react' 

const TextArea = ({
  label,
  name, 
  placeholder,
  rows = 3,
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

      <textarea
        className={`form-control ${className}`}
        name={name}  
        placeholder={placeholder}
        rows={rows}
        required={required}
        {...props}
      ></textarea>
    </div>
  );
};

 


export default TextArea
