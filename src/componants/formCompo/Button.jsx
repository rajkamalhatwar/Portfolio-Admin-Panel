import React from "react";

const Button = ({
  type = "button",
  label,
  className = "",
  onClick,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
