import "./popup.css";

interface PopupProps {
  image: string;
  index: number;
  onClick: (src: string) => void;
}

const Popup: React.FC<PopupProps> = ({ image, index, onClick }) => {
  return (
    <div className="group transition-all duration-300 ease-in-out hover:py-10 hover:px-4">
      <img
        src={image}
        alt={`Gallery ${index}`}
        className="cursor-pointer w-full h-auto object-cover rounded-sm transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-2xl group-hover:opacity-95"
        style={{
          transformOrigin: 'center center',
          position: 'relative',
          top: '0',
          left: '0'
        }}
        onClick={() => onClick(image)}/>
    </div>
  );
};

export default Popup;