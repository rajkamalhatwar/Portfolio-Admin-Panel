// src/components/common/SweetToast.jsx
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseStyle = {
  borderRadius: "14px",
  fontSize: "15px",
  fontWeight: "500",
  padding: "14px 18px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

export const SweetToast = {
  success: (message) =>
    toast.success(message, {
      style: { ...baseStyle, background: "#22c55e", color: "#fff" },
    }),

  error: (message) =>
    toast.error(message, {
      style: { ...baseStyle, background: "#ef4444", color: "#fff" },
    }),

  info: (message) =>
    toast.info(message, {
      style: { ...baseStyle, background: "#3b82f6", color: "#fff" },
    }),

  warning: (message) =>
    toast.warning(message, {
      style: { ...baseStyle, background: "#f59e0b", color: "#fff" },
    }),
};

const TostAlert = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
      transition={Slide}
      progressStyle={{
        height: "4px",
        borderRadius: "0 0 12px 12px",
      }}
    />
  );
};

export default TostAlert;
