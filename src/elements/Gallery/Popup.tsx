import { useState } from "react";
import "./popup.css";

interface PopupProps {
    image: string;
    index: number;
}
export default function Popup({ image, index }: PopupProps) {
    const [Popup] = useState(false);

    const togglePopup = () => {
      
    };
    if(Popup) {
        document.body.classList.add('active-Popup')
      } else {
        document.body.classList.remove('active-Popup')
      }
    
      return (
        <>
          <img
                key={index}
                src={image}
                loading='lazy'
                className="object-cover p-5 max-h-screen w-fit h-full hover:p-2 transition-all"
                onClick= {togglePopup}  />   
    
          {Popup && (
            <div className="Popup">
              <div onClick={togglePopup} className="overlay"></div>
              <div className="Popup-content">
              <img
                key={index}
                src={image}
                loading='lazy'
                className="object-cover p-5 w-fit"
                onClick= {togglePopup}  /> 
                <button className="close-Popup" onClick={togglePopup}>
                  CLOSE
                </button>
              </div>
            </div>
          )}
          </>
      );
}