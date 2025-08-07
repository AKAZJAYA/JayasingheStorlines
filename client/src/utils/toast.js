import { toast } from "react-toastify";

export const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast.info(message),
  warning: (message) => toast.warning(message),
};

// Usage example
// import { showToast } from '../utils/toast';
// showToast.success('Product added to cart!');
