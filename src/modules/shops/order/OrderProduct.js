import React, { useState } from "react";
import Header from "../header/Header";
import { useSelector } from "react-redux"; 
import { USER_ORDER_NAV } from "./../../../_config/shop.config";
import {Link} from "react-router-dom"
import NumberHelper from "./../../../_helpers/number";
const OrderProduct = ({ params, hideList = "" }) => {
  const carts = useSelector(state => state.carts);
  const showCart = () => {
    if(carts.length >0){
        return carts.map((item,value)=>{
        let oldPrice = NumberHelper.formatCurrency(item.price)
            return(
              <div className="oder-item" key={value}>
                <div className="oder-container">
                  <Link to="/product-shipping">
                            <div className ="shop-item cart">
                                <div className ="item-thumbnail">
                                <img className ="thumbnail-img" src={item.image} alt="thumbnail" />
                                </div>
                                <div className ="item-info">
                                    <span className ="id-product">Mã đơn hàng: {item.id}</span>
                                    <span className ="item-name">{item.name}</span>
                                    <span className ="item-price">{oldPrice}</span>
                                    <span className ="item-qty">Số lượng: {item.quantity}</span>
                                </div>
                                <img src="/images/Back-Black.svg" alt="back" />
                            </div>
                            <div className ="day-shipping">
                                <span>Thời gian giao hàng dự kiến: 15-11-2021 20:00</span>
                            </div>
                  </Link>
                </div>
              </div>
            )
        })
    }
}
  const TABS = [
    {id: 1, name: 'Chờ xác nhận', },
    {id: 2, name: 'Chờ lấy hàng' , },
    {id: 3, name: 'Đang giao hàng' , },
    {id: 4, name: 'Đã giao hàng' , },
    {id: 5, name: 'Đã hủy     ' , },
  ]
  const[active,setActive] = useState(1)
  
  return (
    <div id={USER_ORDER_NAV} className="nav-right">
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
                        <button   onClick={e => setActive(item.id)} className={`btn ${item.id === active ? 'active' : ''}`}>{item.name}</button>
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
