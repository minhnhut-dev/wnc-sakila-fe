import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


  toast.options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

   export const toastSuccess = (mess) => {
    if (mess) {
      // toast.success(`${mess}!`);
      // toast.success(`${mess}!`, { toastId: 'successToast' });
      toast.success(`${mess}!`, { toastId: 3, type: toast.TYPE.SUCCESS });

    }
  };

  export const toastError = (error) => {
    if (error) {
      toast.error(`${error}!`, { toastId: 2, type: toast.TYPE.ERROR });
    }
  };
