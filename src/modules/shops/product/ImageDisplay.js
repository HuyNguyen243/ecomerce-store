import React from "react";
import { Link } from "react-router-dom";

const ImageDisplay = ({src, alt}) => {
    return (
        <div className="item-thumbnail">
            <img src={src} className="thumbnail-img" alt={alt}  />
        </div>
    )
}
export default ImageDisplay;