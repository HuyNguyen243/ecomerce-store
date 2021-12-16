import React, { useState } from "react";
import Header from "../header/Header";
// import Loader from "../../../_components/_loader.component";
// import { ShopContext } from "../../../contexts/ShopContext";
// import OrderItem from "./OrderItem";
// import Blankpage from "./../../../_components/_blankpage.component";
import { USER_ORDER_NAV } from "./../../../_config/shop.config";
import {Link} from "react-router-dom"
const OrderProduct = ({ params, hideList = "" }) => {
  // const {
  //   orderByUserId,
  //   getListOrders,
  //   hasMoreOrder,
  //   getListOrdersMore,
  //   pageOrder,
  //   loading
  // } = useContext(ShopContext);
  // const pendingOrderStatus = 0;
  // const doneOrderStatus = 1;
  // const pendingOrderTxt = "Đang xử lý";
  // const doneOrderTxt = "Đã xử lý";

  // var disabled = false;
  // var currentButton = "";
  // var currentActive = [];
  
  // const [status, setStatus] = useState('pending');

  // const statusACTIVE = "ACTIVE";
  // const statusINACTIVE = "INACTIVE";
  // const defaultOption = `status=${statusINACTIVE}`;

  // useEffect(() => {
  //   getListOrders(defaultOption);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [params]);

  // useEffect(() => {
  //   let ele = document.getElementById(USER_ORDER_NAV);
  //   ele.addEventListener("scroll", handleScroll);
  //   return () => ele.removeEventListener("scroll", handleScroll);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [params, hasMoreOrder, orderByUserId]);

  // const handleScroll = () => {
  //   let ele = document.getElementById(USER_ORDER_NAV);
  //   if (ele.scrollTop + ele.offsetHeight === ele.scrollHeight) {
  //     if (hasMoreOrder) {
  //       let mainContain = ele.children[1];
  //       mainContain.insertAdjacentHTML(
  //         "beforeend",
  //         '<div id="load" class="loader"></div>'
  //       );
  //       if (status === "pending") {
  //         getListOrdersMore(`status=${statusINACTIVE}&page=${pageOrder + 1}`);
  //       } else {
  //         getListOrdersMore(`status=${statusACTIVE}&page=${pageOrder + 1}`);
  //       }
  //       document.getElementById("load").remove();
  //     } else {
  //       ele.removeEventListener("scroll", handleScroll);
  //     }
  //   }
  // };

  // const switchTypeProduct = (e) => {
  //   let activeOrderEl = document.getElementsByClassName('order-active');
  //   if (activeOrderEl.length > 0) {
  //     activeOrderEl[0].classList.remove('order-active');
  //   }
  //   currentButton = document.getElementById(e.target.id);
  //   currentActive = document.getElementsByClassName(" choice-active");
  //   if (currentActive.length) {
  //     currentActive[0].disabled = false;
  //     currentActive[0].className = currentActive[0].className.replace(
  //       " choice-active",
  //       ""
  //     );
  //   }
  //   currentButton.disabled = true;
  //   currentButton.className += " choice-active";
  //   setStatus(e.target.id);
  //   if (e.target.id === "pending") {
  //     getListOrders(`status=${statusINACTIVE}`);
  //   } else {
  //     getListOrders(`status=${statusACTIVE}`);
  //   }
  // };

  // var orderList;

  // if (orderByUserId.length > 0) {
  //   orderList = orderByUserId.map((order, index) => {
  //     return (
  //       <div key={index}>
  //         <OrderItem
  //           order={order}
  //           pendingOrderStatus={pendingOrderStatus}
  //           doneOrderStatus={doneOrderStatus}
  //           pendingOrderTxt={pendingOrderTxt}
  //           doneOrderTxt={doneOrderTxt}
  //         />
  //       </div>
  //     );
  //   });
  // } else {
  //   orderList = (
  //     <Blankpage message="Chưa có đơn hàng nào" />
  //   );
  // }
  const showCart = () => {
    const getlocal = JSON.parse(localStorage.getItem("order_6149b1a9c941488634c963cf_4954465131233429"))
    if(getlocal.length >0){
        return getlocal.map((item,value)=>{
            return(
              <div className="oder-item" key={value}>
                <div className="oder-container">
                  <Link to="/product-shipping">
                            <div className ="shop-item cart">
                                <div className ="item-thumbnail">
                                <img className ="thumbnail-img" src={item.image} alt="thumbnail" />
                                </div>
                                <div className ="item-info">
                                    <span className ="id-product ">Mã đơn hàng: 321111</span>
                                    <span className ="item-name title_order">{item.name}</span>
                                    <span className ="item-price">{item.pricePerProduct}</span>
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
