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
import { useTranslation } from "react-i18next";
import { getIdBtnTabs } from "./../../../redux/actions/index";

const OrderProduct = ({ params, hideList = "" }) => {
  const[active,setActive] = useState(0)
  const dispatch = useDispatch();
  const history = useHistory()
  const { t } = useTranslation();
  const orders = useSelector(state => state.orders);
  const idBtnTabs = useSelector(state => state.idBtnTabs);
  const [slider,setSlider] = useState()
  const getOrdersCallback =  React.useCallback(() => {
    dispatch(getListOrders())
  }, [dispatch])
  const [showTabs,setShowTabs] = useState()

  useEffect(() => {
    getOrdersCallback()
    if(idBtnTabs !== ""){
      setActive(idBtnTabs)
    }
    if(idBtnTabs < 4){
      setShowTabs(showTabs )
    }else if( idBtnTabs === 4 || idBtnTabs ===  3 || idBtnTabs ===  2){
      setShowTabs(idBtnTabs + 1)
    }
  }, [getOrdersCallback,idBtnTabs,slider,showTabs])

  const viewDetail = (order) => {
    history.push('/orders/'+order._id)
  }

  const TABS = [
    {id: 1, name: t("oderProduct.PENDING_VENDOR_APPROVE"), status : [STATUS_PENDING_VENDOR_APPROVE] },
    {id: 2, name: t("oderProduct.STATUS_ASSIGNING"), status : [STATUS_IDLE, STATUS_ASSIGNING, STATUS_ACCEPTED_BY_VENDOR] },
    {id: 3, name: t("oderProduct.PROCESS"), status : [STATUS_IN_PROCESS] },
    {id: 4, name: t("oderProduct.COMPLETED"), status : [STATUS_COMPLETED] },
    {id: 5, name: t("oderProduct.CANCELLED"), status : [STATUS_DENIED_BY_VENDOR, STATUS_USER_CANCEL, STATUS_CANCELLED] },
  ]
  const showCart = () => {
    if(orders?.length >0){
        return orders.map((item,value)=>{
          if(item.status === "USER_CANCEL"){
          }
          let totalContainer = 0
          for(let i = 0 ;i < item.reference_items.length ;i++){
            totalContainer += item.reference_items[i].quantity
          }
          if(TABS[active]?.status?.indexOf(item.status) !== -1 ) {
            return(
              <div className="oder-item" key={value}>
                <div className="oder-container">
                  <div onClick={e => viewDetail(item)}>
                      <div className ="shop-item cart">
                          <div className ="item-thumbnail">
                          <img className ="thumbnail-img" src={item.reference_items[0]?.image} alt="thumbnail" />
                          </div>
                          <div className ="item-info">
                            {
                              item.status === "PENDING_VENDOR_APPROVE" &&
                              <span className ={`id-product`}>
                              {t("inforProductShipping.statusOder")}: {t("inforProductShipping.VENDOR_APPROVE")}
                            </span>
                            }
                            {
                              item.status === "USER_CANCEL" &&
                              <span className ={`id-product`}>
                              {t("inforProductShipping.statusOder")}: {t("inforProductShipping.USER_CANCEL")}
                            </span>
                            }
                              <span className ={`id-product ${item?.order_id === undefined && "hide"}`}>{t("inforProductShipping.codeOder")} {item?.order_id !== undefined && item?.order_id}</span>
                              <span className ="item-qty">{t("inforProductShipping.qty")} <span>{totalContainer}</span></span>
                              <span className ="item-qty totalPrice">{t("totalBottom.total")}<span>&nbsp;
                              { NumberHelper.formatCurrency(
                                  (item?.order_info?.total + item?.order_info?.shipping_fee ) - (item?.promotion_info?.discount ? item?.promotion_info?.discount : 0)
                              )  }</span>
                              </span>
                              <span className ="item-qty">{t("oderProduct.Orderdate")} {item.created}</span>
                          </div>
                          <img src="/images/Back-Black.svg" alt="back" />
                      </div>
                      <div className ="day-shipping">
                          <span>{t("oderProduct.expectedDelivery")} {item.delivery_date}</span>
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
    initialSlide: showTabs,
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
      ]
  };

  const handleButton = (index) =>{
    dispatch(getIdBtnTabs(index))
    setActive(index)
    if(index !== 0 || index !== 4){
      if(index > active){
        slider.slickNext()
      }
      if (index < active || index === active){
        slider.slickGoTo(index -1)
      }
    }
  }
  
  return (
    <div className="body_wrapper">
      <Header
        hasNavigation={true}
        doNavigation={hideList}
        navId={USER_ORDER_NAV}
        title= {t("oderProduct.title")}
      />
      <div className="display-flex">
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
          <div className="main_container_style">
          
          <div className="news-style-cart style-for-cart style-product">
              {showCart()}
            </div>
          </div>
      </div>
    </div>
  );
};

export default OrderProduct;
