import React from 'react'
import './App.css'
import NameForm from './components/UserForm/NameForm'
import { Route, Routes } from 'react-router-dom'
import UserSelection from './components/UserForm/UserSlection'
import GameBoard from './components/GameBoard'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<NameForm />} />
        <Route path='/user-selection' element={<UserSelection />} />
        <Route path='/game' element={<GameBoard />} />
      </Routes>
    </div>
  )
}

export default App
