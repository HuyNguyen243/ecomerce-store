import React, { useState } from "react";
import Header from "./header/Header";
import Home from "./home/Home";
import ShopContextProvider from "./../../contexts/ShopContext";
import CartHelper from "./../../_helpers/cart";
import SnackbarHelper from "./../../_helpers/snackbar";
import UrlParamHelper from "./../../_helpers/param";
import Snackbar from "./../../_components/_snackbar.component";

import {
  LIST_CART_NAV,
  LEFT_MENU_NAV,
  ADD_TO_CART_TYPE,
  USER_ORDER_NAV,
} from "./../../_config/shop.config";

const Shop = () => {
  UrlParamHelper.prepare();

  var event;

  const [isShowLeftNav, setIsShowLeftNav] = useState(false);
  const [isShowUserOderNav, setIsShowUserOderNav] = useState(false);
  console.log(isShowUserOderNav)

  const [carts, setCarts] = useState([]);
  console.log(carts)
  const [totalCart, setTotalCart] = useState(0);


  // Navigation
  const showNavigation = (elementId) => {
    event = document.createEvent("HTMLEvents");
    let initEvent = `open_navigation_${elementId}`;
    event.initEvent(initEvent, true, true);
    event.eventName = initEvent;
    document.dispatchEvent(event);
    setNavWidth(elementId, "100%");
    document.getElementsByTagName("html")[0].style.overflow = "auto";
    if (elementId === USER_ORDER_NAV) {
      setIsShowUserOderNav(true);
    }
  };

  const showCart = (e, id) => {
    showNavigation(LIST_CART_NAV);
  };

  const showLeftNav = (el) => {
    let state = !isShowLeftNav;
    setIsShowLeftNav(state);
    let withNav = state ? "100%" : "0%";
    setNavWidth(LEFT_MENU_NAV, withNav);
  };

  const setNavWidth = (el, width) => {
    let navEl = document.getElementById(el)
    if(navEl) {
      document.getElementById(el).style.width = width;
    }
  };

  // Cart
  const addToCart = (item, type = ADD_TO_CART_TYPE) => {
    setTimeout(() => {
      CartHelper.add(item);
      setTotalCart(CartHelper.getTotal());
      setCarts(CartHelper.get());
      if (type === ADD_TO_CART_TYPE) {
        SnackbarHelper.show("Đã thêm vào giỏ hàng");
      } else {
        showNavigation(LIST_CART_NAV);
      }
    }, 1000);
  };


  return (
    <ShopContextProvider>
      <div className={`body_wrapper`} >
        <Header
          showCart={showCart}
          totalCart={totalCart}
          showLeftNav={showLeftNav}
          headerBg="header-primary"
        />
        <Home
          params=""
          isShowLeftNav={isShowLeftNav}
          showLeftNav={showLeftNav}
          showNavigation={showNavigation}
          addToCart={addToCart}
        />
      </div>
      <Snackbar />
    </ShopContextProvider>
  );
};

export default Shop;
