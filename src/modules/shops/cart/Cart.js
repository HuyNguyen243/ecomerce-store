import React, { useState, useEffect, useContext } from "react";
import NumberHelper from "./../../../_helpers/number";
import CartItem from "./CartItem";
import Header from "./../header/Header";
import Blankpage from "./../../../_components/_blankpage.component";
import { ORDER_FORM_NAV, LIST_CART_NAV } from "./../../../_config/shop.config";
import Icon from "./../../../_components/_icon.component";
import AlertHelper from "./../../../_helpers/alert";
import CartHelper from "./../../../_helpers/cart";
import Alert from "./../../../_components/_alert.component";
import Swal from "sweetalert2"
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { ShopContext } from "../../../contexts/ShopContext";
const Cart = ({
  element,
  hideCart,
  totalCart,
  removeCartItem,
  updateCartQuantity,
  showOrderForm,
  showDetail,
}) => {
  const [promotion, setPromotion] = useState({
    priceReduce: 0,
    priceAfterPromotion: 0,
    promotion: {
      code: "",
    },
  });
  // const {product,products} = useContext(ShopContext)
  // const getPromotionData = () => {
  //   let promotionTmp = CartHelper.getPromotion();
  //   if (promotionTmp !== null) {
  //     setPromotion(promotionTmp);
  //   }
  // };

  // const sumPriceAfterPromotion = (sum, reduce) => {
  //   if (reduce > sum) {
  //     return 0;
  //   }
  //   return sum - reduce;
  // };

  // async function handleSubmitPromotion() {
  //   AlertHelper.inputPromotion();
  // }

  // const handleSubmitOrder = () => {
  //   showOrderForm(ORDER_FORM_NAV);
  // };

  // const priceFormat = (price) => {
  //   return NumberHelper.formatCurrency(price);
  // };


  // const priceUsePromotion = (
  //   <div>
  //     <div className="divider"></div>
  //     <div className="row cart-total-info">
  //       <div className="col-6 text-bold text-sm">Mã giảm giá:</div>
  //       <div className="col-6 text-bold txt-right">
  //         <button
  //           className="btn btn-promotion-submit btn-primary has-promotion"
  //           onClick={handleSubmitPromotion}
  //         >
  //           {promotion.promotion.code}
  //         </button>
  //       </div>
  //     </div>
  //     <div className="row cart-total">
  //       <div className="col-6 text-bold text-sm">Giảm:</div>
  //       <div className="col-6 text-bold txt-danger txt-right">
  //         <span className="text-sm">
  //           {priceFormat(-parseInt(promotion.priceReduce))}
  //         </span>
  //       </div>
  //     </div>
  //     <div className="row cart-total">
  //       <div className="col-6 text-bold text-sm">Tổng cộng:</div>
  //       <div className="col-6 text-bold txt-info txt-right">
  //         <span className="text-md">
  //           {priceFormat(
  //             parseInt(sumPriceAfterPromotion(sumPrice, promotion.priceReduce))
  //           )}
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  // );
  // const price = (
  //   <div>
  //     <div className="divider"></div>
  //     <div className="row cart-total-info">
  //       <div className="col-6 text-bold text-sm">Mã giảm giá:</div>
  //       <div className="col-6 text-bold txt-right">
  //           <input type="text" name="code" onClick={handleSubmitPromotion} placeholder="Nhập mã giảm giá" className="btn-discount" />
  //       </div>
  //     </div>
  //     <div className="row cart-total">
  //       <div className="col-6 text-bold text-sm">Tổng cộng:</div>
  //       <div className="col-6 text-bold txt-info txt-right">
  //         <span className="text-md">{priceFormat(sumPrice)}</span>
  //       </div>
  //     </div>
  //   </div>
  // );

  const location = useLocation()
  useEffect(() => {
    if(location.pathname ==  "/cart"){
    // getPromotionData();
    Swal.fire({
      html: 
              "<div class='Offer-Shock'>"+
              "<div class='Offer-title'>"+
              "<img src='/images/sale.png' alt='menu_icon' />"+
              "<p>Bạn ơi bạn có quên ưu đãi này?</p>"
              +
              "</div>"+
              "<div class='container'>"+
                  "<div class='Offer-Details'>"+
                      "<img src='/images/QC_COCA.png'  />"+
                      "<div class='Note-Details'>"+
                          "<p class='Note-Details-titles'>THÙNG 24 LON COCA</p>"+
                          "<p class='Minimum-Order'>Đơn tối thiểu : <span>30.000đ</span></p>"+
                          "<p class='Product-Details'>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet </p>"+
                          "<img src='/images/Group227.svg' alt='menu_icon' />"+
                      "</div>"+
                  "</div>"+
                "</div>"
               ,
      showCloseButton: true,
      showConfirmButton :false,
    })
  }
  },);


  
  const showCart=()=>{
    const getlocal = JSON.parse(localStorage.getItem("order_6149b1a9c941488634c963cf_4954465131233429"))
    if(getlocal.length >0){
        return getlocal.map((item,value)=>{
            return(
                <CartItem item={item} />
            )
        })
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
        <div className="news-style-cart style-for-cart">
        {showCart()}
        </div>
          <div className="fix-bottom">
            {/* {promotion.priceReduce === 0 ? price : priceUsePromotion} */}
            <div>
          <div className="divider"></div>
            {/* <div className="row cart-total-info">
              <div className="col-6 text-bold text-sm">Mã giảm giá:</div>
              <div className="col-6 text-bold txt-right">
                  <input type="text" name="code"  placeholder="Nhập mã giảm giá" className="btn-discount" onClick={showPromotion}/>
              </div>
            </div> */}
            <div className="row cart-total">
              <div className="col-6 text-bold text-sm">Tổng cộng:</div>
              <div className="col-6 text-bold txt-info txt-right">
                <span className="text-md">1</span>
              </div>
            </div>
          </div>
          <div className="btn-with-icon right-icon">
              <Link to="/OderForm">
              <button
                className="btn btn-primary btn-payment"
                // onClick={handleSubmitOrder}
              >
                Đặt hàng
              </button>
              {/* <Icon name="east" /> */}
              </Link>
            </div>
          </div>
        {/* <Alert getPromotionData={getPromotionData} /> */}
      </div>
    </div>
  );
};

export default Cart;
