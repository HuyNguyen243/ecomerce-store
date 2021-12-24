import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import Header from "./../header/Header";
import { LIST_CART_NAV } from "./../../../_config/shop.config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; 
import NumberHelper from "./../../../_helpers/number";
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import TotalBottom from "../order/TotalBottom";
const MySwal = withReactContent(Swal)

const Cart = ({
  hideCart,
  totalCart
}) => {

  const generalData = useSelector(state => state.generalData);
  const carts = useSelector(state => state.carts);
  const [advertisement,setAdevertisement]= useState("")
  
  React.useEffect(()=>{
    if(generalData?.data.banners){
      setAdevertisement(generalData.data.banners)
    }
  },[setAdevertisement,generalData.data.banners])


  useEffect(() => {
  const listSwal = () =>{
    if(advertisement!==""){
      return advertisement.map((item,value)=>{
        return(
          <div className='Offer-Details' key={value}>
              <img src={item.image} alt="logo" />
              <div className='Note-Details'>
                  <p className='Note-Details-titles'>{item.title}</p>
                  {/* <p className='Minimum-Order'>Đơn tối thiểu : <span>30.000đ</span></p> */}
                  <p className='Product-Details'>{item.description}</p>
                  <img src='/images/Group227.svg' alt='menu_icon' />
              </div>
          </div>
        )
      })
    }
  }

    if(advertisement){
      MySwal.fire({
        showCloseButton: true,
        showConfirmButton :false,
        html:  <div className='Offer-Shock'>
                  <div className='Offer-title'> 
                    <img src='/images/sale.png' alt='menu_icon' />
                    <p>Bạn ơi bạn có quên ưu đãi này?</p>
                  </div>
                  <div className='container'>
                    {listSwal()}
                  </div>
                </div>
        ,
      }).then((result)=>{
        if(result.isDismissed){
          setAdevertisement("")
        }
      })
    }
  },[advertisement,setAdevertisement]);

  const showCart=()=>{
    if(carts.length >0){
        return carts.map((item,key)=>{
            return(
                <CartItem index={key} key={key} item={item} />
            )
        })
    }
  }

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
