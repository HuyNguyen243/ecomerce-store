import React from 'react';
import Header from "../header/Header";
import {
    ORDER_FORM_NAV,
    LIST_CART_NAV,
    PRODUCT_DETAIL_NAV,
    USER_ORDER_NAV,
  } from "./../../../_config/shop.config";

function Shipping( carts,
    hideNavigation,
    showNavigation,
    totalCart,
    emptyCart,) {
    return (
        <>
        <Header
             hasNavigation={true}
             doNavigation={hideNavigation}
             navId={ORDER_FORM_NAV}
             title="ĐỊA CHỈ GIAO HÀNG"
         />
         <div className="main_container">
            <form className="basic-form" >
                <div className="form-group">
                    <div className="shipping">
                    <a className="shiper" href="#">Giao hàng tiết kiệm 1</a>
                    <img src="/images/Back-Black.svg" alt="menu_icon" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="shipping">
                    <a className="shiper" href="#">Giao hàng tiết kiệm 2</a>
                    <img src="/images/Back-Black.svg" alt="menu_icon" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="shipping">
                    <a className="shiper" href="#">Giao hàng tiết kiệm 3</a>
                    <img src="/images/Back-Black.svg" alt="menu_icon" />
                    </div>
                </div>
            </form>
        </div>
        </>
    );
}

export default Shipping;