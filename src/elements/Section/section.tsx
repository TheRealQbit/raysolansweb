import React, { useEffect, useState } from 'react';
import "./section.css";
import {Link} from "react-router-dom";

const Minigallery = ({props}) => {
    return(
        <div className="">
            <div className="flex flex-row items-center p-12 h-72">
                <img src={props[0]} className="mini-gallery-image"/>
                <img src={props[1]} className="mini-gallery-image"/>
                <img src={props[2]} className="mini-gallery-image"/>
                <img src={props[3]} className="mini-gallery-image"/>
            </div>
        </div>
    )
}
function Section() {
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
    return(
        <div className="pt-20">
            <ul>
            {data.map((item,index) => (
               <li key={index} className="content-center">
                   <Link to={`/${item.nombre}`}>
                       <div className="flex flex-col items-center">
                           <img src={item.imagenes[1]} className="portada"/>
                           <h2 className="text-white text-sm pt-2">{item.tipo}</h2>
                           <h1 className="seccion-titulo">{item.nombre}</h1>
                           <Minigallery props={item.imagenes}/>
                       </div>
                   </Link>
               </li>
            ))}
            </ul>
        </div>
    )
}
export default Section



