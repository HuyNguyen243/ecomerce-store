import React from 'react';
import PriceDisplay from './PriceDisplay';
import ImageDisplay from './ImageDisplay';
import {Link} from "react-router-dom"
import CartService from '../../../_services/cart';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from './../../../redux/actions/index';
import SnackbarHelper from './../../../_helpers/snackbar';
import { useTranslation } from "react-i18next";
import { getShowLoaded } from "./../../../redux/actions/index";
import { getShowLoadingAddtoCart } from "./../../../redux/actions/index";

const Item = ({id, data}) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const carts = useSelector(state => state.carts);
  const { t } = useTranslation();

  const addToCart = (showCart = false) => {
    for(let i = 0 ;i < carts.length ;i++){
      if(carts[i]["id"] === data._id){
        if(carts[i]["quantity"] + 1  > 9 ){
          SnackbarHelper.show(t("productDetail.maxQty"))
          return false
        }
      }

    }
    if(showCart){
        CartService.add({
          id          : data._id,
          name        : data.name,
          image       : data.image,
          price       : data.price,
          couponPrice : data.couponPrice,
          weight      : data.weight,
          minOrder    : data.minOrder,
          quantity    : 1
        })
        dispatch(addCart())
        dispatch(getShowLoaded(true))
        setTimeout(()=>{
          history.push('/cart')
        },1500)
    }else{
        CartService.add({
          id          : data._id,
          name        : data.name,
          image       : data.image,
          price       : data.price,
          couponPrice : data.couponPrice,
          weight      : data.weight,
          minOrder    : data.minOrder,
          quantity    : 1
        })
        dispatch(addCart())
        dispatch(getShowLoadingAddtoCart(true))
        SnackbarHelper.show(t("productDetail.addCartSuccess"))
    }
  }

  const maximumCart = ()=>{
    SnackbarHelper.show(t("productDetail.maxQty"))
  }
  
  const buttonAddtocart = ()=>{
    let totalContainer = 0;
      for(let i = 0;i < carts?.length ; i++){
          totalContainer +=carts[i].quantity
      }
        return (
            <div className="item-button flex-list row">
              <div className="button-left">
                <span type="button" onClick={()=>(totalContainer < 9 ? addToCart(true):maximumCart())}>{t("home.buttonBuy")}</span>
              </div>
              <div className="button-right" >
                <span type="button" onClick={()=>(totalContainer < 9 ? addToCart():maximumCart())}>
                  <img src="/images/shopping-cart.png" alt="menu_icon" />
                </span>
              </div>
            </div>
        )
  }
  

  return (
      <div className="shop-item">
        <Link to={"/product/"+id}>
          <div><ImageDisplay src={data.image} alt={data.name} /></div>
        </Link>
        <div className="item-info">
          <Link style={{textDecoration: 'none'}} to={"/product/"+id}>
          <div>
            <span className="item-name">{data.name}</span>
            <PriceDisplay coupon={data.couponPrice} price={data.price} />
          </div>
          </Link>
          {buttonAddtocart()}
        </div>
      </div>
  );
}

export default Item;