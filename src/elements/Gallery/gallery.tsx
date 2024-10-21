interface GalleryProps {
    imgArray: string[];
}
const Gallery = ({imgArray}:GalleryProps) => {
    let random = Math.random() * (imgArray.length - 1)
        random = Math.floor(random)
    return (
        <div className=''>          
            <img src={imgArray[random]} alt='gallery' loading='lazy'className='h-screen object-cover w-screen'/>
            <div className='h-fit w-screen absolute'>
            </div>
        </div>
    )
}
export default Gallery;