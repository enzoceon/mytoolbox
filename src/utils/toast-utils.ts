
import { toast as baseToast } from "@/hooks/use-toast";
import { ToastProps } from "@/components/ui/toast";

type ToastMessageOptions = Omit<ToastProps, "title" | "description"> & {
  title?: string;
};

export const toast = {
  ...baseToast,
  
  success: (message: string, options?: ToastMessageOptions) => {
    return baseToast({
      title: options?.title || "Success",
      description: message,
      variant: "default",
      ...options,
    });
  },
  
  error: (message: string, options?: ToastMessageOptions) => {
    return baseToast({
      title: options?.title || "Error",
      description: message,
      variant: "destructive",
      ...options,
    });
  },
  
  info: (message: string, options?: ToastMessageOptions) => {
    return baseToast({
      title: options?.title || "Info",
      description: message,
      variant: "default",
      ...options,
    });
  },
  
  warning: (message: string, options?: ToastMessageOptions) => {
    return baseToast({
      title: options?.title || "Warning",
      description: message,
      variant: "destructive",
      ...options,
    });
  }
};
