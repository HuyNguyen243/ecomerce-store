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
import Slider from "react-slick";

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
    {id: 4, name: 'Hoàn tất', status : [STATUS_COMPLETED] },
    {id: 5, name: 'Đã huỷ', status : [STATUS_DENIED_BY_VENDOR, STATUS_USER_CANCEL, STATUS_CANCELLED] },
  ]

  const showCart = () => {
    if(orders?.length >0){
        return orders.map((item,value)=>{
          let totalContainer = 0
          for(let i = 0 ;i < item.reference_items.length ;i++){
            totalContainer += item.reference_items[i].quantity
          }
          
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
                              <span className ="id-product">Mã đơn hàng: <span>{item._id}</span></span>
                              <span className ="item-qty">Số thùng: <span>{totalContainer}</span></span>
                              <span className ="item-qty">Tổng thanh toán: <span>&nbsp;
                              { NumberHelper.formatCurrency((item.order_info.total + item.order_info.shipping_fee) - item.order_info.discount)  }</span>
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

  const settings = {
    infinite: false,
    enterPadding: "60px",
    slidesToShow: 8,
    slidesToScroll: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      ]
  };


  const [slider,setSlider] = useState()
  const handleButton = (index) =>{
    setActive(index)
    if(index !== 0 || index !== 4){
      if(index > active){
        slider.slickNext()
      }
      if (index < active || index === active){
        slider.slickPrev()
      }
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
          <div  className="style-list">
            <Slider {...settings} ref={c => setSlider(c)}>
              {
                TABS.map((item, index) => {
                  return (
                        <button key={index} onClick={e =>handleButton(index)} className={`btn-button ${index === active ? 'active' : ''}`}>{item.name}</button>
                  )
                })
              }
            </Slider>
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
