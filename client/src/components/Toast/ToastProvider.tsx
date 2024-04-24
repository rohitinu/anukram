import React, { createContext, useContext, useState } from 'react';
export interface Message {
  text: string;
  intent: string;
  timeOut?: number;
  id?: string;
}
interface ToastContextProps {
  toasetMesaage: Message[];
  addToast: (msg: Message) => void;
}
const ToastConetext = createContext({} as ToastContextProps);
const ToastProvider = ({ children }: { children: React.ReactChild }) => {
  const [toasetMesaage, setToastMessage] = useState<Message[]>([]);
  const addToast = (msg: Message) => {
    setToastMessage((prevState) => [msg, ...prevState]);
    setTimeout(() => {
      setToastMessage((prevState) => [...prevState.filter((cv) => cv?.id !== msg?.id)]);
    }, msg.timeOut || 5000);
  };
  return (
    <ToastConetext.Provider value={{ toasetMesaage, addToast }}>{children}</ToastConetext.Provider>
  );
};
