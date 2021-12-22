import React, {useEffect} from 'react';
import ImageDisplay from './ImageDisplay';
// import { PRODUCT_DETAIL_NAV } from './../../../_config/shop.config';

const Slideshow = ({gallery}) => {
    let slideIndex = 1;
    let slideShowItem;
    let slideDots;
    // let intervalSlide;

    useEffect(() => {
        showSlides(slideIndex);
        // document.addEventListener(`hide_navigation_${PRODUCT_DETAIL_NAV}`, function(e) {
        //     slideIndex = 0;
        //     clearInterval(intervalSlide);
        // });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    slideShowItem = gallery.map((slide, key) => {
        return (
            <div key={key} className="mySlides fade">
                <div className="numbertext">{key+1} / {gallery.length}</div>
                <ImageDisplay src={slide} alt={`slide-${key}`} />
            </div>
        )
    })

    slideDots = gallery.map((slide, key) => {
        return (
            <span key={key} className="dot" onClick={e => currentSlide(key+1) }></span>
        )
    })

    function plusSlides(e, n) {
        e.preventDefault();
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }

    return (
        <div>
            <div className="slideshow-container">
                {slideShowItem}
                <a className="prev" href="!#" onClick={e => plusSlides(e, -1) }>&#10094;</a>
                <a className="next" href="!#" onClick={e => plusSlides(e, +1) }>&#10095;</a>
            </div>
            <div className="dot-list">
                {slideDots}
            </div>
        </div>
    )
}

export default Slideshow;