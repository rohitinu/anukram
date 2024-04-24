import React, { createContext, useContext, useState } from 'react';
export interface Message {
  text: string;
  intent: string;
  timeOut?: number;
  id?: number;
}
interface ToastContextProps {
  toasetMesaage: Message[];
  addToast: (msg: Message) => void;
}
const ToastConetext = createContext({} as ToastContextProps);
export const ToastProvider = ({ children }: { children: React.ReactChild }) => {
  const [toasetMesaage, setToastMessage] = useState<Message[]>([]);
  const addToast = (msg: Message) => {
    const message = { ...msg, id: Date.now() };
    setToastMessage((prevState) => [message, ...prevState]);
    setTimeout(() => {
      setToastMessage((prevState) => [...prevState.filter((cv) => cv?.id !== message?.id)]);
    }, msg.timeOut || 5000);
  };
  return (
    <ToastConetext.Provider value={{ toasetMesaage, addToast }}>{children}</ToastConetext.Provider>
  );
};
export const useToast = () => {
  const conetxt = useContext(ToastConetext);
  if (!conetxt) {
    console.error('useToast Should be used inside ToastProvider');
  }
  return conetxt;
};
