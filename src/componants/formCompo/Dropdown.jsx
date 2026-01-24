import React from "react";

const Dropdown = ({
  label,
  name,
  register,
  options = [],
  valueKey = "id",
  labelKey = "text",
  required = false,
  error,
  placeholder = "-- Select --"
}) => {
 return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}

      <select
        id={name}
        className="form-control"
        {...register(name, { required })}
      >
        <option value="0">{placeholder}</option>

        {options.map((item, index) => (
          <option
            key={index}
            value={item[valueKey]}
          >
            {item[labelKey]}
          </option>
        ))}
      </select>

      {error && (
        <small className="text-danger">
          This field is required
        </small>
      )}
    </div>
  );
};

export default Dropdown;
