import React from 'react';
import NumberHelper from "./../../../_helpers/number";

const PriceDisplay = ({coupon, price}) => {
  let oldPrice;
  let currentPrice;
  if (coupon > 0) {
    oldPrice = NumberHelper.formatCurrency(price)
    currentPrice = coupon;
  } else {
    currentPrice = price;
  }

  const getPercentage = (oldPrice, newPrice) => {
    let percentage = Math.round((((oldPrice - newPrice) / oldPrice ) * 100 ));
    if (newPrice === 0 || percentage === 0) {return}
    return (
      <span className="item-percentage">
        &#45;{percentage}&#37;
      </span>
    )
  }
  return (
    <div className="item-price ">
      <div className="item-discount">
        <span className="item-old-price">{oldPrice}</span>
        {getPercentage(price, coupon)}
      </div>
      <span className="current-price">
        {NumberHelper.formatCurrency(currentPrice)}
      </span>
    </div>
  );
};
export default PriceDisplay;
