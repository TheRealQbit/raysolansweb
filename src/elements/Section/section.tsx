import { useEffect, useState } from 'react';
import "./section.css";
import {Link} from "react-router-dom";
import { Item } from '../../App';

interface MinigalleryProps {
    images: string[];
}
const Minigallery: React.FC<MinigalleryProps> = ({images}) => {
    return(
        <div className="p-12">
            <div className="grid-container">{/*flex flex-row items-center p-12 h-72 */}
                <img src={images[0]} loading='lazy' className="mini-gallery-image"/>
                <img src={images[1]} loading='lazy' className="mini-gallery-image"/>
                <img src={images[2]} loading='lazy' className="mini-gallery-image"/>
                <img src={images[3]} loading='lazy' className="mini-gallery-image"/>
            </div>
        </div>
    )
}
function Section() {
    const [data, setData] = useState<Item[]>([]);
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
               <li key={index} className="content-center bg-black">
                   <Link to={`/${item.nombre}`}>
                       <div className="flex flex-col items-center">
                           <img src={item.imagenes[1]} className="portada"/>
                           <h2 className="text-white text-sm pt-2">{item.tipo}</h2>
                           <h1 className="seccion-titulo">{item.nombre}</h1>
                           <Minigallery images={item.imagenes}/>
                       </div>
                   </Link>
               </li>
            ))}
            </ul>
        </div>
    )
}
export default Section



