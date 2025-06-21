import { JSX } from "react";
import toast from "react-hot-toast";

type ToastType = "success" | "error" | "loading" | "custom";

interface ToastOptions {
  duration?: number;
  icon?: string | JSX.Element;
  style?: React.CSSProperties;
  className?: string;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

export const toastService = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, options);
  },

  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, options);
  },

  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(message, options);
  },

  dismiss: (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  },

  //   // Create a promise toast that shows loading, then success/error
  //   promise: <T>(
  //     promise: Promise<T>,
  //     {
  //       loading = "Loading...",
  //       success = "Success!",
  //       error = "Error occurred",
  //     }: {
  //       loading?: string;
  //       success?: string | ((data: T) => string);
  //       error?: string | ((err: any) => string);
  //     } = {},
  //     options?: ToastOptions
  //   ) => {
  //     return toast.promise(
  //       promise,
  //       {
  //         loading,
  //         success: success as any,
  //         error: error as any,
  //       },
  //       options
  //     );
  //   },
};
