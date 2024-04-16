import { useState, } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Onboarding from './pages/Onboarding'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Onboarding />} />
          <Route path="/home" element={<Onboarding />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
