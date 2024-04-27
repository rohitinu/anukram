import React, { createContext, useContext, useState } from 'react';
import { UserType } from '../../common/types';
interface AppContextProps {
  isDarkTheme: boolean;
  currentUser: UserType;
  gameRoomCode: string;
  setCurrentUser: (user: UserType) => void;
  setGameRoomCode: (gameCode: string) => void;
  toggleTheme: () => void;
}
const AppConetext = createContext({} as AppContextProps);
export const AppContextProvider = ({ children }: { children: React.ReactChild }) => {
  const [isDarkTheme, setDarkTheme] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserType>(
    JSON.parse(sessionStorage.getItem('playerInfo') || '{}') as UserType,
  );
  const [gameRoomCode, setGameRoomCode] = useState<string>('');
  const toggleTheme = () => {
    setDarkTheme((prevState) => !prevState);
  };
  return (
    <AppConetext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
        currentUser,
        gameRoomCode,
        setCurrentUser,
        setGameRoomCode,
      }}
    >
      {children}
    </AppConetext.Provider>
  );
};
export const useAppContext = () => {
  const conetxt = useContext(AppConetext);
  if (!conetxt) {
    console.error('useAppContext Should be used inside AppContextProvider');
  }
  return conetxt;
};
