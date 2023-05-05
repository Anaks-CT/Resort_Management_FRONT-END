import { toast } from "react-toastify";

export const toastMessage = (type: "success" | "error" | "warning", message: string) => {
  return toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
