import React from 'react';
import Slider from "react-slick";

function Offer(data) {
    const settings = {
        dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: false
      };


    const showslide =() =>{
        if(data.data!== undefined){
            return data.data.map((item,value)=>{
                return(
                     <div key={value}>
                         <div className="Offer-Details" >
                             <img src={item.image} alt="img" />
                             <div className="Note-Details">
                                 <p className="Note-Details-titles">{item.title}</p>
                                 {/* <p className="Minimum-Order">Đơn tối thiểu : <span>{item?.price}</span></p> */}
                                 <p className="Product-Details">{item.description}</p>
                                 <img src="/images/Group227.svg" alt="menu_icon" />
                             </div>
                         </div>
                     </div>
                 )
            })
        }
    }
      return (
          <div >
            <div className="container">
            <div className="Offer-title">
                 <img src="/images/sale.png" alt="menu_icon" />
                 <p>ƯU ĐÃI SỐC CHỈ HÔM NAY</p>
            </div>
                <Slider {...settings}>
                    {showslide()}
                </Slider>
            </div>
        </div>
      );
}

export default Offer;