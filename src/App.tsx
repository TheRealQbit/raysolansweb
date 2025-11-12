import {useEffect, useState,} from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Onboarding from './pages/Onboarding'
import {AnimatePresence} from "framer-motion";
import SectionPage from "./pages/SectionPage";
import Contacto from './pages/Contacto';
import ScrollToTop from './elements/scrolltotop';
import Biografia from './pages/Biografía';
import { withBase } from './functions';
export interface Item {
  nombre: string;
  tipo: string;
  imagenes: string[];  
  imagen: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  tipoGalería: Int8Array[];
  tags: string[];
  video: string;
  portada: string;
}
function App() {
  const [data, setData] = useState([]);
  useEffect(()=>{

    // Cleanup function to restore the original style
  fetch(withBase('secciones.json'))
        .then((response) => {
          if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching data:', error));
    return () => {
          document.body.style.overflowX = '';
    };
  }, []);
  return (
    <div>
        <AnimatePresence>
          <HashRouter>
          <ScrollToTop/>
            <Routes>
              <Route index element={<Onboarding />} />
              <Route path="/home" element={<Onboarding />}/>
              {data.map((item: Item) => (
                  <Route path={`/${item.nombre}`} element={<SectionPage {...item}/>}/>
              ))}
              <Route path="/contact" element={<Contacto/>}/>
              <Route path="/bio" element={<Biografia/>}/>
            </Routes>
          </HashRouter>
        </AnimatePresence>
    </div>
  )
}

export default App;
