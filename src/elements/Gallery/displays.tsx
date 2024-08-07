import React from 'react';
import Popup from './Popup';

interface GalleryProps {
    images: string[];
}
const Display: React.FC<GalleryProps> = ({ images }) => {

    const array1 = images.filter((_, index) => index % 2 === 0);
    const array2 = images.filter((_, index) => index % 2 !== 0);
    return (
        <div>
            <div className='flex flex-row items-stretch relative bg-black w-screen'>
                <div className='w-1/2 flex flex-col items-end' >
                {array1.map((image, index) => (
                    <Popup key={index} image={image} index={index} />               
                ))}
                </div>
                <div className='w-1/2 flex flex-col items-start'>
                {array2.map((image, index) => (
                    <Popup key={index} image={image} index={index} />                     
                ))}
                </div>
            </div>
        </div>
    );
}
export {Display};