import React from "react";

const Checkbox = ({
  label,
  name,
  register,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <div className={`form-check form-check-flat form-check-primary form-group ${className}`}>
      <label className="form-check-label">
        <input
          type="checkbox"
          className="form-check-input"
          disabled={disabled}
          {...(register && register(name))}
          {...props}
        />
        {label}
        <i className="input-helper"></i>
      </label>
    </div>
  );
};

export default Checkbox;

