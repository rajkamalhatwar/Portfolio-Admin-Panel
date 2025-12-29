import React from 'react' 

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 3,
  required = false,   // 👈 NEW
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
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
      ></textarea>
    </div>
  );
};

 


export default TextArea
