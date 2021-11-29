import React from "react";
import OrderConfirm from './OrderConfirm';
import Icon from './../../../_components/_icon.component';

const OrderItem = ({ order }) => {

  let isExpanded = false;

  const doDropdown = (orderId) => {
    isExpanded = !isExpanded;
    let parentItem = document.getElementById(orderId);
    let childDropdown = parentItem.getElementsByClassName('material-icons')[0];
    if (isExpanded) {
      parentItem.classList.add('order-active')
      childDropdown.classList.add('rotate-180')
    }else {
      parentItem.classList.remove('order-active')
      childDropdown.classList.remove('rotate-180')
    }
  }

  let promotion = {
    priceReduce: 0,
    priceAfterPromotion: 0,
  };
  if (order.priceAfterPromotion) {
    promotion = {
      priceReduce: order.priceReduceByPromotion,
      priceAfterPromotion: order.priceAfterPromotion
    }
  }

  return (
    <div id={order._id} className="order-detail__wrapper">
      <div className="flex-list order-detail flex-stretch" onClick={e => doDropdown(order._id)}>
        <span className="dropdown-icon"><Icon dataAction="collapse" name="keyboard_arrow_up" /></span>
        <div>
          <p className="order-label">Mã đơn hàng</p>
          <span className="order-value">{order.orderId}</span>
        </div>
        <div>
          <p className="order-label">Số lượng</p>
          <span className="order-value">{order.products.length}</span>
        </div>
        <div className="order-created">
          <p className="order-label">Ngày đặt</p>
          <span className="order-value">{order.readableCreated}</span>
        </div>
      </div>
      <div className="order-detail-info">
        <OrderConfirm
          orderProducts={order.products}
          userInfo={order} 
          promotion={promotion}
          hasDefaultPromotion={true} />
      </div>
    </div>
  );
};

export default OrderItem;
