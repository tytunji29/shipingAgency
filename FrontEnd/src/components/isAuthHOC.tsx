"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function isAuth(Component: any) {
  const { state } = useAppContext();
  return function IsAuth(props: any) {
    const auth = false;

    useEffect(() => {
      if (!auth) {
        return redirect("/");
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
