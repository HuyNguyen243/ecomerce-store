import React from 'react';

function Offer(props) {
    return (
        <div className="Offer-Shock">
            <div className="container">
                        <div className="Offer-title">
                            <img src="/images/sale.png" alt="menu_icon" />
                            <p>ƯU ĐÃI SỐC CHỈ HÔM NAY</p>
                        </div>
                        <div className="Offer-Details">
                            <img src="/images/QC_COCA.png"  />
                            <div className="Note-Details">
                                <p className="Note-Details-titles">THÙNG 24 LON COCA</p>
                                <p className="Minimum-Order">Đơn tối thiểu : <span>30.000đ</span></p>
                                <p className="Product-Details">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet </p>
                                <img src="/images/Group227.svg" alt="menu_icon" />
                            </div>
                        </div>
            </div>
        </div>
    );
}

export default Offer;