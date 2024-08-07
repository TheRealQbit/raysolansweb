import "../gallery.css";

const GalleryNavigation = () => {
    return (  
        <div className="m-100 m-120 mt-270 content-center">  
            <div>
                <p>Hola benas</p>
                <p>Hola benas2</p>
            </div>
            <div>
                <p>Hola</p>
            </div>
            <div className="mt-120 flex justify-between">
                <ul className="flex items-center gap-0 list-none">
                    <li className="galleryNavButton"></li>
                    <li className="galleryNavButton"></li>
                    <li className="galleryNavButton"></li>
                </ul>
            </div>
        </div>
    )
}

export default GalleryNavigation;