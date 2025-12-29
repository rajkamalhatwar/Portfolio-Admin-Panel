import React from 'react'

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
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

      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}   // 👈 HTML validation
      />
    </div>
  );
};

export default Input
