import { Link } from "react-router-dom";

const ImageType1 = ({ image, text }) => {
    return (
        <div className="flex flex-row items-center justify-between p-5 h-96 w-full bg-black">
            <img src={image} className="h-full w-auto hover:pl-2 transition-all" />
            <h1 className="text-white text-3xl font-bold pr-2 text-wrap text-right hover:pr-8 transition-all">{text}
                rthr
            </h1>
        </div>
        
    )
}
const ImageType2 = ({ image, text }) => {
    return (
        <div className="flex flex-row items-center justify-between p-5 h-96 w-full bg-black">
            <h1 className="text-white text-3xl font-bold pl-2 text-wrap text-right hover:pl-8 transition-all">{text}</h1>
            <img src={image} className="h-full w-auto hover:pr-2 transition-all" />            
        </div>
    )
}
export {ImageType1, ImageType2};