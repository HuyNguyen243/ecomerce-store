import Header from "../header/Header";
import React from 'react';
import CartItem from '../cart/CartItem';
import { useSelector } from "react-redux";
import{Link}from "react-router-dom"
import { useHistory } from "react-router";
import Swal from "sweetalert2"

function OderInformation(
    hideNavigation,
) {
    const history = useHistory()
    const carts = useSelector(state => state.carts);

    const showCart=()=>{
        if(carts.length >0){
            return carts.map((item, key)=>{
                return(
                    <CartItem index={key} item={item} key={key}/>
                )
            })
        }
        
    }

    const handleBackPage=()=>{
        history.push("/OderForm")
    }

    const showPromotion=()=>{
        Swal.fire({
          title: 'MÃ GIẢM GIÁ',
          html: "<div class='promotion'>"+ 
                  "<input type='text' class='input-promotion' placeholder='Nhập mã giảm giá'/>"+
                  // 
                      "<div class='container-promotion'>"+
                        "<div class='Offer-promotion'>"+
                            "<img src='/images/sale2.png'  />"+
                            "<div class='content-promotion'>"+
                                "<p class='code-promotion'>CC1PLUS1</p>"+
                                "<p class='Minimum-Order'>MUA 1 TẶNG 1 (Đơn tối thiểu 100.000đ)</p>"+
                                "<p class='expiry-promotion'>Hạn sử dụng: 30/11/2021</p>"+
                            "</div>"+
                        "</div>"+
                        "<div class='use-promotion'>"+
                          "<span>Sử dụng ngay</span>"+
                        "</div>"+
                    "</div>"+
                    // 
                "</div>",
    
          confirmButtonText: 'Áp dụng',
          showCancelButton: true,
          cancelButtonText: "Đóng"
        })
      }

    return (
        
        <div className="body_wrapper ">
            <Header
                hasNavigation={true}
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
                                <span className="shiper" href="#">Giao hàng tiết kiệm 1</span>
                                <img src="/images/Back-Black.svg" alt="menu_icon" />
                            </div>
                        </div>
                </form>
                <div className="news-style-cart style-for-cart">
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
                        <input type="text" name="code"   placeholder="Nhập mã giảm giá" className={"btn-discount"} onClick={showPromotion}  />
                        </div>
                    </div>
                    </div>
                    <div className="btn-with-icon right-icon">
                        <button type="submit" className="btn btn-primary btn-left-icon " onClick={handleBackPage}>Quay lại</button>
                        <Link to="/oderConfirm"><button type="submit" className="btn btn-primary btn-right-icon ">Tiếp tục</button></Link>
                        {/* <button type="submit" className="btn btn-primary btn-right-icon">Tiếp tục</button> */}
                    </div>
            </div>
        </div>
    );
}

export default OderInformation;