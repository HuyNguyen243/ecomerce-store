import Header from "../header/Header";
import React, { useContext } from 'react';
import CartItem from '../cart/CartItem';
import { ORDER_FORM_NAV, LIST_CART_NAV } from "./../../../_config/shop.config";
import Alert from "./../../../_components/_alert.component";
import{Link}from "react-router-dom"


function OderInformation(
    carts,
    hideNavigation,
    showNavigation,
    totalCart,
    emptyCart,
) {
    const showCart=()=>{
        const getlocal = JSON.parse(localStorage.getItem("order_6149b1a9c941488634c963cf_4954465131233429"))
        console.log(getlocal)
        if(getlocal.length >0){
            return getlocal.map((item,value)=>{
                return(
                    <CartItem item={item} />
                )
            })
        }
        
    }


    return (
        
        <div className="body_wrapper ">
            <Header
                   hasNavigation={true}
                   doNavigation={hideNavigation}
                   navId={ORDER_FORM_NAV}
                   title="THÔNG TIN ĐẶT GIAO HÀNG"
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
                                    <img src="/images/fix.svg" alt="menu_icon" />
                                    <img src="/images/tickV.svg" alt="menu_icon" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="shipping">
                                <a className="shiper" href="#">Giao hàng tiết kiệm 1</a>
                                <img src="/images/Back-Black.svg" alt="menu_icon" />
                            </div>
                        </div>
                </form>
                <div className="news-style-cart">
                {showCart()}
                </div>
                {/* <Alert getPromotionData={getPromotionData} /> */}
            </div>
            <div className="fix-bottom">
                <div>
                    <div className="divider"></div>
                    <div className="row cart-total-info">
                        <div className="col-6 text-bold text-sm">Mã giảm giá:</div>
                        <div className="col-6 text-bold txt-right">
                            <input type="text" name="code"  placeholder="Nhập mã giảm giá" className="btn-discount" />
                        </div>
                    </div>
                    </div>
                    <div className="btn-with-icon right-icon">
                        <button type="submit" className="btn btn-primary btn-left-icon " >Quay lại</button>
                        <Link to="/oderConfirm"><button type="submit" className="btn btn-primary btn-right-icon ">Tiếp tục</button></Link>
                        {/* <button type="submit" className="btn btn-primary btn-right-icon">Tiếp tục</button> */}
                    </div>
            </div>
        </div>
    );
}

export default OderInformation;