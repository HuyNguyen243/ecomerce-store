import React from 'react';
import Header from "../header/Header";


function Shipping() {
    return (
        <>
        <Header
            hasNavigation={true}
            title="PHƯƠNG THỨC VẬN CHUYỂN"
         />
         <div className="main_container">
            <form className="basic-form" >
                <div className="form-group">
                    <div className="shipping">
                    <span className="shiper" href="#">Giao hàng tiết kiệm 1</span>
                    <img src="/images/Back-Black.svg" alt="menu_icon" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="shipping">
                    <span className="shiper" href="#">Giao hàng tiết kiệm 2</span>
                    <img src="/images/Back-Black.svg" alt="menu_icon" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="shipping">
                    <span className="shiper" href="#">Giao hàng tiết kiệm 3</span>
                    <img src="/images/Back-Black.svg" alt="menu_icon" />
                    </div>
                </div>
            </form>
        </div>
        </>
    );
}

export default Shipping;