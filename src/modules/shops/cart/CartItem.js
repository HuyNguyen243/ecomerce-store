import React from "react";
import Icon from "../../../_components/_icon.component";
import PriceDisplay from "./../product/PriceDisplay";
import ImageDisplay from "./../product/ImageDisplay";
import { LIST_CART_NAV } from "./../../../_config/shop.config";
const CartItem = ({
  item,
  index,
  updateCartQuantity,
  removeCartItem,
  showDetail,
}) => {
  const showCartItemDetail = (e, id) => {
    document.getElementById(LIST_CART_NAV).style.width = "0%";
    showDetail(e, id);
  };

  return (
    <div className="shop-item cart">
      <ImageDisplay src={item.image} alt={item.name} />
      <div className="item-info">
        <span
          className="item-name"
          onClick={(e) => showCartItemDetail(e, item.id)}
        >
          {item.name}
        </span>
        <div className="news-style-QTY">
          <PriceDisplay coupon={item.couponPrice} price={item.pricePerProduct} />
          <div className="col-7 item-quantity flex-list">
            <div className="flex-list quantity-options">
              <span
                className="quantiy-action quantity-minus"
                onClick={() => updateCartQuantity(index, item.quantity - 1)}
              >
                <img src="/images/add-.svg" alt="menu_icon" className="add" />

              </span>
              <span>{item.quantity}</span>
              <span
                className="quantiy-action quantity-add"
                onClick={() => updateCartQuantity(index, item.quantity + 1)}
              >
                <img src="/images/add+.svg" alt="menu_icon" className="add" />
              </span>
            </div>
            <div
              className="col-2"
              onClick={() => {
                removeCartItem(index);
              }}
            >
              <img src="/images/delete.svg" alt="menu_icon" className="delete" />
              {/* <Icon name="delete" styled="outlined" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
