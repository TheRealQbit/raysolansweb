import {useState} from 'react';
import GalleryNavigation from './NavBar/galleryNavigation';
const Gallery = ({imgCount, imgArray}) => {
    const [currentImg, setCurrentImg] = useState(0);
    return (
        <div className=''>          
            <img src={imgArray[currentImg]} alt='gallery' className='h-fit w-fit'/>
            <div className='h-fit w-fit absolute'>
            </div>
        </div>
    )
}
export default Gallery;