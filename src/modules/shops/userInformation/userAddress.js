import React from 'react';
import Header from "../header/Header";
import{Link} from "react-router-dom"
import {
  ORDER_FORM_NAV,
  LIST_CART_NAV,
  PRODUCT_DETAIL_NAV,
  USER_ORDER_NAV,
} from "./../../../_config/shop.config";


function userAddress(
    carts,
    hideNavigation,
    showNavigation,
    totalCart,
    emptyCart,
) {
    return (
        <div >
            <Header
                hasNavigation={true}
                doNavigation={hideNavigation}
                navId={ORDER_FORM_NAV}
                title="ĐỊA CHỈ GIAO HÀNG"
            />
            <div className="main_container">
                <form className="basic-form">
                    <div className="form-group">
                        <div className="information">
                            <div className="infor-user newstyle">
                                <p>Nguyễn Văn A <span>[Mặc định]</span></p>
                                <p>(+84) 987654321</p>
                                <p>117 Nguyễn Đình Chính, phường 5, quận Phú Nhuận, Hồ Chí Minh</p>
                            </div>
                            <div className="infor-icon newstyle">
                                <Link  to="/news-address"><img src="/images/fix.svg" alt="menu_icon" /></Link>
                                <img src="/images/tickV.svg" alt="menu_icon" />
                            </div>
                        </div>
                    </div>
                    <div className="fix-bottom">
                        <div className="btn-with-icon right-icon">
                            <Link to="/news-address"><button type="submit" className="btn btn-primary">Thêm địa chỉ mới</button></Link>
                            {/* <Icon name="east" /> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default userAddress;