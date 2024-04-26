import React from 'react';
import './App.css';
import NameForm from './components/UserForm/NameForm';
import { Route, Routes } from 'react-router-dom';
import UserSelection from './components/UserForm/UserSlection';
import WaitinRoom from './components/UserForm/WaitingRoom';
import Toaster from './components/Toast/Toaster';
import { ToastProvider } from './components/Toast/ToastProvider';
import GameBoardConatiner from './components/GameBoard/GameBoardConatiner';

function App() {
  return (
    <div
      style={{
        background:
          'radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)',
        height: '100vh',
      }}
      className='App'
    >
      <ToastProvider>
        <>
          <Toaster />
          <Routes>
            <Route path='/' element={<NameForm />} />
            <Route path='/user-selection' element={<UserSelection />} />
            <Route path='/game' element={<GameBoardConatiner />} />
            <Route path='/waiting-room' element={<WaitinRoom />} />
          </Routes>
        </>
      </ToastProvider>
    </div>
  );
}

export default App;
