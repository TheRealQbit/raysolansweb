import React, {useEffect, useState,} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Onboarding from './pages/Onboarding'
import {AnimatePresence} from "framer-motion";
import SectionPage from "./pages/SectionPage";

function App() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    fetch('./secciones.json')
        .then((response) => {
          if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <div>
        <AnimatePresence>
          <BrowserRouter>
            <Routes>
              <Route index element={<Onboarding />} />
              <Route path="/home" element={<Onboarding />}/>
              {data.map((item,index) => (
                  <Route path={`/${item.nombre}`} element={<SectionPage props={item}/>}/>
              ))}
            </Routes>
          </BrowserRouter>
        </AnimatePresence>
    </div>
  )
}

export default App
