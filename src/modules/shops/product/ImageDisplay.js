import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const ImageDisplay = ({src, alt}) => {
    return (
        <div className="item-thumbnail ">
                <LazyLoadImage
                alt={alt}
                src={src} // use normal <img> attributes as props
                effect="opacity"
                className="thumbnail-img"
                 />
        </div>
    )
}
export default ImageDisplay;