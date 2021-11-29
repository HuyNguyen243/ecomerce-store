import React, { useState, useEffect } from "react";
import NumberHelper from "./../../../_helpers/number";
import CartItem from "./CartItem";
import Header from "./../header/Header";
import Blankpage from "./../../../_components/_blankpage.component";
import { ORDER_FORM_NAV, LIST_CART_NAV } from "./../../../_config/shop.config";
import Icon from "./../../../_components/_icon.component";
import AlertHelper from "./../../../_helpers/alert";
import CartHelper from "./../../../_helpers/cart";
import Alert from "./../../../_components/_alert.component";

const Cart = ({
  element,
  hideCart,
  totalCart,
  carts,
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

  let listItems;
  let sumPrice = 0;

  useEffect(() => {
    getPromotionData();
  }, [showOrderForm]);

  const getPromotionData = () => {
    let promotionTmp = CartHelper.getPromotion();
    if (promotionTmp !== null) {
      setPromotion(promotionTmp);
    }
  };

  const sumPriceAfterPromotion = (sum, reduce) => {
    if (reduce > sum) {
      return 0;
    }
    return sum - reduce;
  };

  async function handleSubmitPromotion() {
    AlertHelper.inputPromotion();
  }

  const handleSubmitOrder = () => {
    showOrderForm(ORDER_FORM_NAV);
  };

  const priceFormat = (price) => {
    return NumberHelper.formatCurrency(price);
  };

  if (carts.length > 0) {
    listItems = carts.map((item, index) => {
      let price =
        item.couponPrice > 0 ? item.couponPrice : item.pricePerProduct;
      sumPrice += item.quantity * price;
      return (
        <div key={index}>
          <CartItem
            item={item}
            index={index}
            showDetail={showDetail}
            removeCartItem={removeCartItem}
            updateCartQuantity={updateCartQuantity}
            priceFormat={priceFormat}
          />
        </div>
      );
    });
  } else {
    listItems = <Blankpage message="Giỏ hàng rỗng" />;
  }

  const priceUsePromotion = (
    <div>
      <div className="divider"></div>
      <div className="row cart-total-info">
        <div className="col-6 text-bold text-sm">Mã giảm giá:</div>
        <div className="col-6 text-bold txt-right">
          <button
            className="btn btn-promotion-submit btn-primary has-promotion"
            onClick={handleSubmitPromotion}
          >
            {promotion.promotion.code}
          </button>
        </div>
      </div>
      <div className="row cart-total">
        <div className="col-6 text-bold text-sm">Giảm:</div>
        <div className="col-6 text-bold txt-danger txt-right">
          <span className="text-sm">
            {priceFormat(-parseInt(promotion.priceReduce))}
          </span>
        </div>
      </div>
      <div className="row cart-total">
        <div className="col-6 text-bold text-sm">Tổng cộng:</div>
        <div className="col-6 text-bold txt-info txt-right">
          <span className="text-md">
            {priceFormat(
              parseInt(sumPriceAfterPromotion(sumPrice, promotion.priceReduce))
            )}
          </span>
        </div>
      </div>
    </div>
  );
  const price = (
    <div>
      <div className="divider"></div>
      <div className="row cart-total-info">
        <div className="col-6 text-bold text-sm">Mã giảm giá:</div>
        <div className="col-6 text-bold txt-right">
          <button
            className="btn btn-promotion-submit btn-primary"
            onClick={handleSubmitPromotion}
          >
            Nhập mã
          </button>
        </div>
      </div>
      <div className="row cart-total">
        <div className="col-6 text-bold text-sm">Tổng cộng:</div>
        <div className="col-6 text-bold txt-info txt-right">
          <span className="text-md">{priceFormat(sumPrice)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div id={LIST_CART_NAV} className="overlay nav-right">
      <Header
        doNavigation={hideCart}
        navId={LIST_CART_NAV}
        hasNavigation={true}
        title="Giỏ hàng"
        totalCart={totalCart}
      />
      <div className="main_container">
        {listItems}
        {totalCart > 0 ? (
          <div className="fix-bottom">
            {promotion.priceReduce === 0 ? price : priceUsePromotion}
            <div className="btn-with-icon right-icon">
              <button
                className="btn btn-primary btn-payment"
                onClick={handleSubmitOrder}
              >
                Đặt hàng
              </button>
              <Icon name="east" />
            </div>
          </div>
        ) : (
            ""
          )}
        <Alert getPromotionData={getPromotionData} />
      </div>
    </div>
  );
};

export default Cart;
