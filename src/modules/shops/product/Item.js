import React from 'react';
import PriceDisplay from './PriceDisplay';
import ImageDisplay from './ImageDisplay';
import Icon from './../../../_components/_icon.component';
import { QUICK_BUY_TYPE } from './../../../_config/shop.config';

const Item = ({data, showDetail, addToCart}) => {
  return (
    <div className="shop-item">
      <div onClick={e => showDetail(e, data._id )}><ImageDisplay src={data.image} alt={data.name} /></div>
      <div className="item-info">
        <div onClick={e => showDetail(e, data._id )}>
          <span className="item-name">{data.name}</span>
          <PriceDisplay coupon={data.couponPrice} price={data.price} />
        </div>
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
            <Icon name="add_shopping_cart" styled="outlined"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;