"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
// import emailjs from "@emailjs/browser";
import { useProductStore } from "@/modules/products/products";

type StateType = {
  [key: string]: any;
};

type ContextType = {
  state: StateType;
  setState: (newState: StateType) => void;
  // sendEmail: ({}: { [key: string]: any }) => void;
  // CMSFetchedData: any;
};

export const Context = createContext<ContextType | null>(null);

export default function Provider({
  children,
  // CMSFetchedData,
}: Readonly<{
  children: React.ReactNode;
  // CMSFetchedData: any;
}>) {
  const [state, setState] = useState<StateType>({});
  const getProductsAsync = useProductStore((s) => s.getProductsAsync);
  
  useEffect(() => {
    getProductsAsync();
  }, []);


  // const sendEmail = ({ event, service, template, form, public_key, setIsLoading }: any) => {
  //   setIsLoading(true);
  //   event.preventDefault();
  //   if (state.isFormSubmitted) {
  //     alert("Your message is already sent.");
  //     setIsLoading(false);
  //     return;
  //   }
  //   emailjs.sendForm(service, template, form, public_key).then(
  //     (result) => {
  //       alert("Your message was successfully sent.");
  //       setState((prev) => ({ ...prev, isFormSubmitted: true }));

  //       setIsLoading(false);
  //     },
  //     (error) => {
  //       errorAlert("Something went wrong. Please try again.");
  //       setIsLoading(false);
  //     }
  //   );
  // };

  return (
    <Context.Provider
      value={{
        state,
        ...state,
        setState,
        // sendEmail,
        // CMSFetchedData
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useGlobalContext must be used within an Provider");
  }
  return context;
};
