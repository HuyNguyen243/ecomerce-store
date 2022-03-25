import React from "react";
import PriceDisplay from "./../product/PriceDisplay";
import ImageDisplay from "./../product/ImageDisplay";
import { useHistory } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import CartService from '../../../_services/cart';
import { addCart } from './../../../redux/actions/index';
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content';
import { useTranslation } from "react-i18next";
import { deleteCartTrue } from "./../../../redux/actions/index";
import { getParentInformationDeviveryUser } from './../../../redux/actions/index';
import { getShowLoadingAddtoCart } from "./../../../redux/actions/index";
import SpinnerAddToCart from "../../../_helpers/SpinnerAddToCart";

const CartItem = ({item,index}) => {
  const MySwal = withReactContent(Swal)
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const getdeletecart = useSelector(state => state.getdeletecart)
  const oneDeliveryUser = useSelector(state => state.oneDeliveryUser);

  const handleCancel =(e)=>{
    MySwal.close()
  }

  const updateQuantity = (quantity) => {
    if(quantity === 0) {
      Showpopup()
    }else {
      if(quantity > 9){
        quantity = 9
        MySwal.fire({
          icon: 'info',
          showCancelButton: false,
          showConfirmButton: false,
          html : <div className="swal_deleteProduct">
                  <div>
                    <p className="text-danger">{t("EXCEED_QUANTITY_PRO")}</p>
                  </div>
                  <div className="group-btn">
                    <button className="cancelBtn" onClick={handleCancel}>{t("cart.CloseButton")}</button>
                  </div>
                </div>
        })
      }
      CartService.updateQuantity(index, quantity)
    }
    dispatch(addCart())
    dispatch(getParentInformationDeviveryUser(oneDeliveryUser))
    dispatch(getShowLoadingAddtoCart(true))
  }

  const handleBtn =(e)=>{
    let name = e.target.className
    if(name === "cancelBtn"){
      MySwal.close()
    }else{
      MySwal.clickConfirm()
    }
  }

  const Showpopup = () =>{
    MySwal.fire({
      icon: 'info',
      showCancelButton: false,
      showConfirmButton: false,
      html : <div className="swal_deleteProduct">
              <div>
                <p className="txt-delete">{t("cart.swalDeleteProduct")}</p>
              </div>
              <div className="group-btn">
                <button className="cancelBtn" onClick={handleBtn}>{t("cart.CancelDeleteProduct")}</button>
                <button className="confirmBtn" onClick={handleBtn}>{t("cart.AccessDeleteProduct")}</button>
              </div>
            </div>
    }).then((result)=>{
        if(result.isConfirmed){
          dispatch(deleteCartTrue(true))
          CartService.remove(index);
          dispatch(addCart())
        }
    })
  }
  
  const removeCartItem = () => {
    Showpopup()
    dispatch(getParentInformationDeviveryUser(oneDeliveryUser))
  }

  const getlang = localStorage.getItem("i18nextLng")

  return (
    <div className="shop-item cart">
      <SpinnerAddToCart />
      <ImageDisplay src={item.image} alt={item.name} />
      <div className="item-info">
        <span
          className="item-name"
          onClick={(e) => history.push('/product/'+item.id)}
        >
          {getdeletecart && getlang === "vi" && item.name_vi}
          {getdeletecart && getlang === "vi" && item.name_vi === undefined && item.name}
          {getdeletecart && getlang === "en" && item.name_en}
          {!getdeletecart && item.name}
        </span>
        <div className="news-style-QTY">
          <PriceDisplay coupon={item.couponPrice} price={item.price} />
          <div className="col-7 item-quantity flex-list">
            <div className="flex-list quantity-options">
              <span
                className="quantiy-action quantity-minus"
                onClick={() => updateQuantity(item.quantity - 1)}
              >
                <img src="/images/add-.svg" alt="menu_icon" className="add" />

              </span>
              <span>{item.quantity}</span>
              <span
                className="quantiy-action quantity-add"
                onClick={() => updateQuantity(item.quantity + 1)}
              >
                <img src="/images/add+.svg" alt="menu_icon" className="add" />
              </span>
            </div>
            <div
              className="col-2"
              onClick={() => {
                removeCartItem();
              }}
            >
              <img src="/images/delete.svg" alt="menu_icon" className="delete" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
