import React from 'react';
import PriceDisplay from './PriceDisplay';
import ImageDisplay from './ImageDisplay';
import {Link} from "react-router-dom"
import CartService from '../../../_services/cart';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from './../../../redux/actions/index';
import SnackbarHelper from './../../../_helpers/snackbar';

const Item = ({id, data}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const addToCart = (showCart = false) => {
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
    SnackbarHelper.show('Thêm vào giỏ hàng thành công')
    dispatch(addCart())
    if(showCart) {
      history.push('/cart')
    }
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
          <div className="item-button flex-list row">
            <div className="button-text">
              <button type="button" onClick={() => addToCart(true)} className="btn btn-view">Mua ngay</button>
            </div>
            <div className="button-icon txt-center" onClick={() => addToCart()}>
              <img src="/images/shopping-cart.png" alt="menu_icon" />
            </div>
          </div>
        </div>
      </div>
  );
}

export default Item;