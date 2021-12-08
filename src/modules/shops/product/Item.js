import React from 'react';
import PriceDisplay from './PriceDisplay';
import ImageDisplay from './ImageDisplay';
// import Icon from './../../../_components/_icon.component';
import { QUICK_BUY_TYPE } from './../../../_config/shop.config';
import {Link} from "react-router-dom"

const Item = ({id, data, addToCart}) => {
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
              <button type="button" onClick={() => addToCart({
                  id              : data._id,
                  name            : data.name,
                  couponPrice     : data.couponPrice,
                  pricePerProduct : data.price,
                  quantity        : 1,
                  image           : data.image
                }, QUICK_BUY_TYPE)} className="btn btn-view">Mua ngay</button>
            </div>
            <div className="button-icon txt-center" onClick={() => addToCart({
                  id              : data._id,
                  name            : data.name,
                  couponPrice     : data.couponPrice,
                  pricePerProduct : data.price,
                  quantity        : 1,
                  image           : data.image
                })}>
              <img src="/images/shopping-cart.png" alt="menu_icon" />
            </div>
          </div>
        </div>
      </div>
  );
}

export default Item;