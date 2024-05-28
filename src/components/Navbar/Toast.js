import React from 'react';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ message, show, setShow }) => {
  React.useEffect(() => {
    if (show && message) {
      toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setShow(false); // Reset show state after showing the toast
    }
  }, [show, message, setShow]);

  return <ToastContainer />;
};

export default Toast;
