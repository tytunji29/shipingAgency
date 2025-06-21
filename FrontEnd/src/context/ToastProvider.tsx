"use client";

import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          // Default options for all toasts
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Configure different types of toasts
          success: {
            duration: 3000,
            style: {
              background: "#10B981",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#EF4444",
            },
          },
        }}
      />
    </>
  );
}
