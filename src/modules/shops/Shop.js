import React, { useState, useEffect } from "react";
import Header from "./header/Header";
import Home from "./home/Home";
import ShopContextProvider from "./../../contexts/ShopContext";
import CartHelper from "./../../_helpers/cart";
import SnackbarHelper from "./../../_helpers/snackbar";
import UrlParamHelper from "./../../_helpers/param";
import Snackbar from "./../../_components/_snackbar.component";

import {
  LIST_CART_NAV,
  PRODUCT_DETAIL_NAV,
  LIST_PRODUCT_NAV,
  LEFT_MENU_NAV,
  ADD_TO_CART_TYPE,
  USER_ORDER_NAV,
} from "./../../_config/shop.config";

const Shop = () => {
  UrlParamHelper.prepare();

  var event;

  const [params, setParams] = useState("");
  const [listTitle, setListTitle] = useState("");
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowLeftNav, setIsShowLeftNav] = useState(false);
  const [isShowUserOderNav, setIsShowUserOderNav] = useState(false);
  const [id, setId] = useState(0);

  const [carts, setCarts] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

  let formData = UrlParamHelper.getParams();

  const getListData = (paramsData, title = "") => {
    setParams(paramsData);
    setListTitle(title);
    showList();
  };

  //check url
  useEffect(() => {
    if (formData.productId !== null) {
      showDetail(null, formData.productId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const hideNavigation = (elementId) => {
    event = document.createEvent("HTMLEvents");
    let initEvent = `hide_navigation_${elementId}`;
    event.initEvent(initEvent, true, true);
    event.eventName = initEvent;
    document.dispatchEvent(event);
    setNavWidth(elementId, "0%");
    document.getElementsByTagName("html")[0].style.overflow = "auto";
    if (elementId === USER_ORDER_NAV) {
      setIsShowUserOderNav(false);
    }
  };

  const showDetail = (e, id) => {
    if (e) {
      e.preventDefault();
    }
    setIsShowDetail(true);
    setId(id);
    showNavigation(PRODUCT_DETAIL_NAV);
  };

  const hideDetail = (el) => {
    setIsShowDetail(false);
    hideNavigation(PRODUCT_DETAIL_NAV);
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

  const showList = (el) => {
    showNavigation(LIST_PRODUCT_NAV);
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


  const removeCartItem = (index) => {
    CartHelper.remove(index);
    setCarts(CartHelper.get());
    CartHelper.saveCartAPI(CartHelper.get());
    setTotalCart(CartHelper.getTotal());
  };

  return (
    <ShopContextProvider>
      <div className={`body_wrapper`}>
        <Header
          handleSubmit={getListData}
          showCart={showCart}
          totalCart={totalCart}
          showLeftNav={showLeftNav}
          headerBg="header-primary"
        />
        <Home
          params=""
          showDetail={showDetail}
          isShowLeftNav={isShowLeftNav}
          showLeftNav={showLeftNav}
          showNavigation={showNavigation}
          getListData={getListData}
          addToCart={addToCart}
        />
      </div>
      <Snackbar />
    </ShopContextProvider>
  );
};

export default Shop;
