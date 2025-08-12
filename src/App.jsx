import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Detail from './pages/Detail'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/course" element={<Detail/>} />

      {/* Add more routes as needed */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default App
