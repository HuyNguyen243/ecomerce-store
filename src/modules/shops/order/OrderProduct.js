import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { USER_ORDER_NAV } from "./../../../_config/shop.config";
import { getListOrders } from './../../../redux/actions/index';
import NumberHelper from "./../../../_helpers/number";
import { 
  STATUS_PENDING_VENDOR_APPROVE,
  STATUS_DENIED_BY_VENDOR,
  STATUS_USER_CANCEL,
  STATUS_IDLE,
  STATUS_ASSIGNING,
  STATUS_ACCEPTED_BY_VENDOR,
  STATUS_IN_PROCESS,
  STATUS_COMPLETED,
  STATUS_CANCELLED
} from './../../../_config/shop.config';

const OrderProduct = ({ params, hideList = "" }) => {
  const[active,setActive] = useState(0)
  const dispatch = useDispatch();
  const history = useHistory()

  const isLoading = useSelector(state => state.isLoading);
  const orders = useSelector(state => state.orders);

  const getOrdersCallback =  React.useCallback(() => {
    dispatch(getListOrders())
  }, [dispatch])

  useEffect(() => {
    getOrdersCallback()
  }, [getOrdersCallback])

  const viewDetail = (order) => {
    history.push('/orders/'+order._id)
  }

  const TABS = [
    {id: 1, name: 'Chờ xác nhận', status : [STATUS_PENDING_VENDOR_APPROVE] },
    {id: 2, name: 'Chờ lấy hàng', status : [STATUS_IDLE, STATUS_ASSIGNING, STATUS_ACCEPTED_BY_VENDOR] },
    {id: 3, name: 'Đang giao hàng', status : [STATUS_IN_PROCESS] },
    {id: 4, name: 'Đã giao hàng', status : [STATUS_COMPLETED] },
    {id: 5, name: 'Đã huỷ', status : [STATUS_DENIED_BY_VENDOR, STATUS_USER_CANCEL, STATUS_CANCELLED] },
  ]

  const showCart = () => {
    if(orders?.length >0){
        return orders.map((item,value)=>{
          if(TABS[active].status.indexOf(item.status) !== -1) {
            return(
              <div className="oder-item" key={value}>
                <div className="oder-container">
                  <div onClick={e => viewDetail(item)}>
                      <div className ="shop-item cart">
                          <div className ="item-thumbnail">
                          <img className ="thumbnail-img" src={item.reference_items[0]?.image} alt="thumbnail" />
                          </div>
                          <div className ="item-info">
                              <span className ="id-product">Mã đơn hàng: {item._id}</span>
                              <span className ="item-qty">Tổng số sản phẩm: {item.reference_items.length}</span>
                              <span className ="item-qty">Tổng thanh toán:&nbsp;
                              { NumberHelper.formatCurrency(
                                  (item?.order_info?.total + item?.order_info?.shipping_fee ) - (item?.promotion_info?.discount ? item?.promotion_info?.discount : 0)
                              )  }
                              </span>
                              <span className ="item-qty">Ngày đặt hàng: {item.created}</span>
                          </div>
                          <img src="/images/Back-Black.svg" alt="back" />
                      </div>
                      <div className ="day-shipping">
                          <span>Thời gian giao hàng dự kiến: {item.delivery_date}</span>
                      </div>
                  </div>
                </div>
              </div>
            )
          }else {
            return ''
          }
        })
    }
  }

  return (
    <div id={USER_ORDER_NAV} className="nav-right">
      {
        isLoading
        && <div className="overlay-spinner"></div>
      }
      <Header
        hasNavigation={true}
        doNavigation={hideList}
        navId={USER_ORDER_NAV}
        title="DANH SÁCH ĐƠN HÀNG"
      />
      <div className="main_container">
        <div className="horizontal-wrapper">
          <div id="mostView" className="horizontal-list btn-Oder-list">
              {
                TABS.map((item, index) => {
                  return (
                    <div className="horizontal-list-item " key={index}>
                      <div className=" style-item">
                        <button   onClick={e =>setActive(index)} className={`btn ${index === active ? 'active' : ''}`}>{item.name}</button>
                      </div>
                    </div>
                  )
                })
              }
          </div>
        </div>
      <div className="news-style-cart style-for-cart style-product">
          {showCart()}
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
