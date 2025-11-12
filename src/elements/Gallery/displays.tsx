import React, { useState } from 'react';
import Popup from './Popup';
import { ImageViewer } from '../ImageViewer/ImageViewer';

interface GalleryProps {
  images: string[];
}

const Display: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const closeViewer = () => {
    setSelectedImage(null);
  };

  // Distribute images across columns (max 3)
  const distributeImages = (images: string[], numColumns: number) => {
    const columns: string[][] = Array.from({ length: numColumns }, () => []);
    images.forEach((image, index) => {
      const columnIndex = index % numColumns;
      columns[columnIndex].push(image);
    });
    return columns;
  };

  // Determine number of columns based on screen size and max 3
  const getColumnCount = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 1; // Mobile: 1 column
      if (width < 1024) return 2; // Tablet: 2 columns
      return 3; // Desktop: 3 columns (max)
    }
    return 3; // Default fallback
  };

  const [columnCount, setColumnCount] = React.useState(getColumnCount);

  React.useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const imageColumns = distributeImages(images, columnCount);

  return (
    <div className="flex justify-center w-full">
      {/* Main gallery container - responsive grid with max 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl w-full bg-black p-4">
        {imageColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4">
            {column.map((image, imageIndex) => (
              <div key={`${columnIndex}-${imageIndex}`} className="w-full">
                <Popup 
                  image={image} 
                  index={images.indexOf(image)} 
                  onClick={handleImageClick} 
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Fullscreen Viewer */}
      {selectedImage && <ImageViewer src={selectedImage} alt="Gallery Image" onClose={closeViewer} />}
    </div>
  );
};

export { Display };