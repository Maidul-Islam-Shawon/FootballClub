import { toast } from "react-toastify";

export const AddedMessage = () => {
  toast.success("Successfully Added", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
  });
};

export const UpdateMessage = () => {
  toast.info("Successfully Updated", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
  });
};

export const DeleteMessage = () => {
  toast.error("Successfully Deleted", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
  });
};
