import React from 'react';
import './App.css';
import NameForm from './components/UserForm/NameForm';
import { Route, Routes } from 'react-router-dom';
import UserSelection from './components/UserForm/UserSlection';
import GameBoard from './components/GameBoard';
import WaitinRoom from './components/UserForm/WaitingRoom';
import Toaster from './components/Toast/Toaster';

function App() {
  return (
    <div className='App'>
      <Toaster />
      <Routes>
        <Route path='/' element={<NameForm />} />
        <Route path='/user-selection' element={<UserSelection />} />
        <Route path='/game' element={<GameBoard />} />
        <Route path='/waiting-room' element={<WaitinRoom />} />
      </Routes>
    </div>
  );
}

export default App;
