import { useEffect, useState } from 'react';
import "./section.css";
import {Link} from "react-router-dom";
import { Item } from '../../App';
import { buildImageUrl, withBase } from '../../functions/index';

interface MinigalleryProps {
    images: string[];
}

const Minigallery: React.FC<MinigalleryProps> = ({images}) => {
    return(
        <div className="p-12">
            <div className="grid-container">
                <img src={buildImageUrl(images[0], "_button")} loading='lazy' className="mini-gallery-image"/>
                <img src={buildImageUrl(images[1], "_button")} loading='lazy' className="mini-gallery-image"/>
                <img src={buildImageUrl(images[2], "_button")} loading='lazy' className="mini-gallery-image"/>
                <img src={buildImageUrl(images[3], "_button")} loading='lazy' className="mini-gallery-image"/>
            </div>
        </div>
    )
}
function Section() {
    const [data, setData] = useState<Item[]>([]);
    useEffect(()=>{
    fetch(withBase('secciones.json'))
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
                           <img src={withBase(item.portada)} className="portada" loading='eager'/>
                           <h2 className="text-white text-sm pt-2 font-special-elite">{item.tipo}</h2>
                           <h1 className="seccion-titulo font-special-elite">{item.nombre}</h1>
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



