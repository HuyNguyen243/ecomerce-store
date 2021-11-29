import React from "react";
import NumberHelper from "../../../_helpers/number";
import CartHelper from "../../../_helpers/cart";
import ImageDisplay from "../product/ImageDisplay";
import PriceDisplay from "../product/PriceDisplay";
import Icon from "./../../../_components/_icon.component";

const OrderConfirm = ({
  createOrder,
  userInfo,
  orderProducts,
  isProcessing,
  setStep,
  prevStep,
  promotion = {
    priceReduce: 0,
    priceAfterPromotion: 0,
  },
  hasDefaultPromotion = false
}) => {
  let listItems;
  let sumPrice = 0;

  const promotionTmp = CartHelper.getPromotion();
  if (promotionTmp !== null && !hasDefaultPromotion) {
    promotion = promotionTmp;
  }

  const priceFormat = (price) => {
    return NumberHelper.formatCurrency(price);
  };

  const goBack = (step) => {
    setStep(step);
  };

  if (orderProducts.length > 0) {
    listItems = orderProducts.map((item, index) => {
      let price =
        item.couponPrice > 0 ? item.couponPrice : item.pricePerProduct;
      sumPrice += item.quantity * price;
      return (
        <div key={index}>
          <div className="shop-item cart">
            <ImageDisplay src={item.image} alt={item.name} />
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <PriceDisplay
                coupon={item.couponPrice}
                price={item.pricePerProduct}
              />
              <span>Số lượng: {item.quantity}</span>
            </div>
          </div>
        </div>
      );
    });
  }

  const priceUsePromotion = (
    <div>
      <div className="divider"></div>
      <div className="row cart-total">
        <div className="col-6 text-bold text-sm">Giảm:</div>
        <div className="col-6 text-bold txt-info txt-right">
          <span className="text-sm txt-danger">{priceFormat(-parseInt(promotion.priceReduce))}</span>
        </div>
      </div>
      <div className="row cart-total">
        <div className="col-6 text-bold text-sm">Tổng cộng:</div>
        <div className="col-6 text-bold txt-info txt-right">
          <span className="text-md">
            {priceFormat(parseInt(promotion.priceAfterPromotion))}
          </span>
        </div>
      </div>
    </div>
  );
  const price = (
    <div>
      <div className="divider"></div>
      <div className="row cart-total">
        <div className="col-6 text-bold text-sm">Tổng cộng:</div>
        <div className="col-6 text-bold txt-info txt-right">
          <span className="text-md">{priceFormat(parseInt(sumPrice))}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="order_confirm_wrapper">
      <div className="user_order_info">
        <div className="detail_info">
          <div>{userInfo.customerName}</div>
        </div>
        <div className="detail_info">
          <div>{userInfo.customerAddress}</div>
        </div>
        <div className="detail_info">
          <div>{userInfo.customerPhone}</div>
        </div>
        {userInfo.note ? (
          <div className="detail_info">
            <label>Ghi chú:</label>
            <div>{userInfo.note}</div>
          </div>
        ) : (
            ""
          )}
      </div>
      <div className="main_container">
        <div className="nav_label">
          <span>Sản phẩm</span>
        </div>
        <div className="list-products">{listItems}</div>
      </div>
      <div className="fix-bottom">
        {promotion.priceAfterPromotion === 0 ? price : priceUsePromotion}
        {createOrder ? (
          <div className="flex-list group-btn">
            <div className="btn-with-icon btn-with-icon-left">
              <button
                onClick={() => {
                  goBack(prevStep);
                }}
                type="button"
                className="btn btn-default"
              >
                Trở về
              </button>
              <Icon name="keyboard_backspace" />
            </div>
            <div className="btn-with-icon right-icon">
              <button
                onClick={() => {
                  createOrder();
                }}
                className={`btn btn-primary ${isProcessing ? "btn-loader" : ""
                  }`}
              >
                Xác nhận
              </button>
              <Icon name="east" />
            </div>
          </div>
        ) : (
            ""
          )}
      </div>
    </div>
  );
};

export default OrderConfirm;
