import React, { useState, useEffect } from "react";
import List from "./List";
import Header from "./header/Header";
import Home from "./home/Home";
import Detail from "./product/Detail";
import Cart from "./cart/Cart";
import Order from "./order/Order";
import ShopContextProvider from "./../../contexts/ShopContext";
import CartHelper from "./../../_helpers/cart";
import SnackbarHelper from "./../../_helpers/snackbar";
import UrlParamHelper from "./../../_helpers/param";
import Snackbar from "./../../_components/_snackbar.component";
import OrderProduct from "./order/OrderProduct";
import Profile from "./user/Profile";
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

  let cartItems = CartHelper.get();
  const [carts, setCarts] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

  let formData = UrlParamHelper.getParams();

  const getListData = (paramsData, title = "") => {
    setParams(paramsData);
    setListTitle(title);
    showList();
  };

  //getCart
  useEffect(() => {
    getCartFromApi();
  }, []);

  const getCartFromApi = () => {
    CartHelper.getCartAPI().then((response) => {
      let items = response.data.data.products;
      localStorage.removeItem(CartHelper.key_storage_cartid());
      CartHelper.saveCartId(response.data.data._id);
      CartHelper.save(items);
      setCarts(CartHelper.get());
      setTotalCart(items.length)
    })
    .catch((error) => {
      localStorage.removeItem(CartHelper.key_storage());
      CartHelper.save([]);
      setTotalCart(0)
    });
  }

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
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
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
    document.getElementById(el).style.width = width;
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

  const updateCartQuantity = (index, quantity) => {
    if (quantity <= 0) {
      removeCartItem(index);
      return;
    }
    cartItems[index].quantity = quantity;
    CartHelper.save(cartItems);
    CartHelper.saveCartAPI(cartItems);
    setCarts(cartItems);
    setTotalCart(CartHelper.getTotal());
  };

  const removeCartItem = (index) => {
    CartHelper.remove(index);
    setCarts(CartHelper.get());
    CartHelper.saveCartAPI(CartHelper.get());
    setTotalCart(CartHelper.getTotal());
  };

  const emptyCart = () => {
    CartHelper.empty();
    setCarts([]);
    setTotalCart(0);
  };
  return (
    <ShopContextProvider>
      <div className={`body_wrapper ${UrlParamHelper.isProBot() ? 'pro_bot_style' : ''}`}>
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
        <List
          params={params}
          title={listTitle}
          showDetail={showDetail}
          hideList={hideNavigation}
          addToCart={addToCart}
        />
        <OrderProduct params={isShowUserOderNav} hideList={hideNavigation}  />
        <Detail
          id={id}
          isShowDetail={isShowDetail}
          hideDetail={hideDetail}
          showCart={showCart}
          addToCart={addToCart}
          totalCart={totalCart}
        />
        <Cart
          hideCart={hideNavigation}
          totalCart={totalCart}
          carts={carts}
          updateCartQuantity={updateCartQuantity}
          removeCartItem={removeCartItem}
          showOrderForm={showNavigation}
          showDetail={showDetail}
        />
        <Order
          hideNavigation={hideNavigation}
          showNavigation={showNavigation}
          totalCart={totalCart}
          emptyCart={emptyCart}
          carts={carts}
        />
        <Profile hideNavigation={hideNavigation} />
      </div>
      <Snackbar />
    </ShopContextProvider>
  );
};

export default Shop;
