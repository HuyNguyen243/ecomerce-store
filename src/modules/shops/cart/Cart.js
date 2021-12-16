import React, { useEffect } from "react";
import CartItem from "./CartItem";
import Header from "./../header/Header";
import { LIST_CART_NAV } from "./../../../_config/shop.config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; 
import NumberHelper from "./../../../_helpers/number";
import { useLocation } from "react-router";
// import Swal from "sweetalert2"
// import withReactContent from 'sweetalert2-react-content'
import TotalBottom from "../order/TotalBottom";
// const MySwal = withReactContent(Swal)

const Cart = ({
  hideCart,
  totalCart
}) => {
  const carts = useSelector(state => state.carts);
  const location = useLocation()

  // const promotionAd = () => {
  //   MySwal.fire({
  //     showCloseButton: true,
  //     showConfirmButton :false,
  //     html:  <div className='Offer-Shock'>
  //               <div className='Offer-title'> 
  //                 <img src='/images/sale.png' alt='menu_icon' />
  //                 <p>Bạn ơi bạn có quên ưu đãi này?</p>
  //               </div>
  //               <div className='container'>
  //                 <div className='Offer-Details'>
  //                     <img src='/images/QC_COCA.png' alt="logo" />
  //                     <div className='Note-Details'>
  //                         <p className='Note-Details-titles'>THÙNG 24 LON COCA</p>
  //                         <p className='Minimum-Order'>Đơn tối thiểu : <span>30.000đ</span></p>
  //                         <p className='Product-Details'>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet </p>
  //                         <img src='/images/Group227.svg' alt='menu_icon' />
  //                     </div>
  //                 </div>
  //               </div>
  //             </div>
  //     ,
  //   })
  // }

  useEffect(() => {
    // promotionAd()
  },[location]);

  const showCart=()=>{
    if(carts.length >0){
        return carts.map((item,key)=>{
            return(
                <CartItem index={key} key={key} item={item} />
            )
        })
    }
  }

  console.log(carts)

  const calcTotalPrice = () => {
    if(carts.length >0){
      let total = 0;
      for (let i = 0; i < carts.length; i++) {
        let price = carts[i].couponPrice > 0 ? carts[i].couponPrice : carts[i].price
        total += price * carts[i].quantity
      }
      return NumberHelper.formatCurrency(total)
    }
  }

  return (
    <div id={LIST_CART_NAV} className="nav-right">
      <Header
        doNavigation={hideCart}
        navId={LIST_CART_NAV}
        hasNavigation={true}
        title="Giỏ hàng"
        totalCart={totalCart}
      />
      <div className="main_container">
        <div className="news-style-cart style-for-cart stl-botom-cart list-cart">
          {showCart()}
          </div>
      </div>
      {
              carts.length > 0
              && <div className="fix-bottom">
                  <div>
                  <div className="divider"></div>
                    <TotalBottom totalPrice={calcTotalPrice()}/>
                  </div>
                  <div className="btn-with-icon right-icon">
                    <Link to="/OderForm">
                    <button
                      className="btn btn-primary btn-payment"
                    >
                      Đặt hàng
                    </button>
                    </Link>
                  </div>
                </div>
            }
    </div>
  );
};

export default Cart;
