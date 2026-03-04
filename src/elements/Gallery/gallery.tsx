import { withBase } from '../../functions';
import { useMemo } from 'react';

interface GalleryProps {
    imgArray: string[];
}
const Gallery = ({imgArray}:GalleryProps) => {
    const randomImage = useMemo(() => {
        const random = Math.floor(Math.random() * imgArray.length);
        return imgArray[random];
    }, [imgArray]);

    return (
        <div className=''>
            <img
                src={withBase(randomImage)}
                alt='Ray Solans Photography - Portfolio Hero Image'
                loading='eager'
                className='h-screen object-cover w-screen'
                fetchPriority='high'
            />
            <div className='h-screen w-screen absolute'>
            </div>
        </div>
    )
}
export default Gallery;