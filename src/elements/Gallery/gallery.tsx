import { withBase } from '../../functions';

interface GalleryProps {
    imgArray: string[];
}
const Gallery = ({imgArray}:GalleryProps) => {
    let random = Math.random() * (imgArray.length - 1)
        random = Math.floor(random)
    return (
        <div className=''>          
            <img src={withBase(imgArray[random])} alt='gallery' loading='eager'className='h-screen object-cover w-screen'/>
            <div className='h-screen w-screen absolute'>
            </div>
        </div>
    )
}
export default Gallery;