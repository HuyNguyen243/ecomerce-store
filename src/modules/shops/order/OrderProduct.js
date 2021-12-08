import React, { useEffect, useContext, useState } from "react";
import Header from "../header/Header";
import Loader from "../../../_components/_loader.component";
import { ShopContext } from "../../../contexts/ShopContext";
import OrderItem from "./OrderItem";
import { USER_ORDER_NAV } from "./../../../_config/shop.config";
import Blankpage from "./../../../_components/_blankpage.component";
import $ from "jquery"
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
const handleSelect= (e)=>{
  const name= e.target.className
  
}

  
  return (
    <div id={USER_ORDER_NAV} className="overlay nav-right">
      <Header
        hasNavigation={true}
        doNavigation={hideList}
        navId={USER_ORDER_NAV}
        title="DANH SÁCH ĐƠN HÀNG"
      />
      <div className="main_container">
        <div className="btn-Oder-list">
          <button onClick={handleSelect} className="btn1"  >Chờ xác nhận</button>
          <button onClick={handleSelect} className="btn2"  >Chờ lấy hàng</button>
          <button onClick={handleSelect} className="btn3"  >Đang giao hàng</button>
          <button onClick={handleSelect} className="btn4"  >Đã giao hàng</button>
        </div>
        {/* <div style={{ textAlign: "center" }}>
          <button
            id="pending"
            className={`pendingChoice ${
              status === "pending" ? "choice-active" : ""
            }`}
            onClick={switchTypeProduct}
            disabled={disabled}
          >
            {pendingOrderTxt}
          </button>
          <button
            id="expire"
            className="expireChoice placeChoice"
            onClick={switchTypeProduct}
            disabled={disabled}
          >
            {doneOrderTxt}
          </button>
        </div>
        { loading ? <Loader /> : orderList } */}
      </div>
    </div>
  );
};

export default OrderProduct;
