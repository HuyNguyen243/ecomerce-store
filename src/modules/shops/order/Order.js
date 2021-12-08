import React, { useContext, useState, useEffect } from "react";
import Header from "../header/Header";
import OrderForm from "./OrderForm";
import OrderConfirm from "./OrderConfirm";
import OrderDone from "./OrderDone";
import CartHelper from "./../../../_helpers/cart";
import SnackbarHelper from "./../../../_helpers/snackbar";
import UrlParamHelper from "./../../../_helpers/param";
import { ShopContext } from "./../../../contexts/ShopContext";
import {
  ORDER_FORM_NAV,
  LIST_CART_NAV,
  PRODUCT_DETAIL_NAV,
  USER_ORDER_NAV,
} from "./../../../_config/shop.config";

const Order = ({
  carts,
  hideNavigation,
  showNavigation,
  totalCart,
  emptyCart,
}) => {
  const stepSubmitInfo = 1;
  const stepConfirm = 2;
  const stepDone = 3;

  const { submitOrder, getUserInfo } = useContext(ShopContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(stepSubmitInfo);
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    document.addEventListener(`open_navigation_${ORDER_FORM_NAV}`, function (
      e
    ) {
      getInfo();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getInfo() {
    setIsLoading(true);
    let response = await getUserInfo();
    if (response) {
      setIsLoading(false);
      setUser(response.data);
    }
  }
  const getStep = () => {
    if (step === stepSubmitInfo) {
      return (
        <OrderForm user={user} isLoading={isLoading} onSubmit={onSubmit} />
      );
    } else if (step === stepConfirm) {
      return (
        <OrderConfirm
          createOrder={createOrder}
          setStep={setStep}
          prevStep={stepSubmitInfo}
          orderProducts={carts}
          userInfo={formData}
          isProcessing={isProcessing}
        />
      );
    } else if (step === stepDone) {
      return <OrderDone closeOrder={closeOrder} />;
    }
  };

  const moveToStep = (step) => {
    setStep(step);
  };

  const onSubmit = (data) => {
    let products = CartHelper.get();
    let formValue = {
      BotId: UrlParamHelper.get().botId,
      customerName: data.customerName,
      customerAddress: data.customerAddress,
      customerPhone: data.customerPhone,
      note: data.note,
      userId: UrlParamHelper.get().userId,
      products: products,
    };

    setFormData(formValue);
    moveToStep(stepConfirm);
  };

  const closeOrder = () => {
    hideNavigation(ORDER_FORM_NAV);
    hideNavigation(LIST_CART_NAV);
    hideNavigation(PRODUCT_DETAIL_NAV);
    showNavigation(USER_ORDER_NAV);
  };

  async function createOrder() {
    if (isProcessing) {
      return;
    }
    setIsProcessing(true);
    var formSubmit = new FormData();
    formSubmit.append("BotId", formData.BotId);
    formSubmit.append("customerName", formData.customerName);
    formSubmit.append("customerAddress", formData.customerAddress);
    formSubmit.append("customerPhone", formData.customerPhone);
    formSubmit.append("note", formData.note);
    formSubmit.append("userId", formData.userId);
    formSubmit.append("products", JSON.stringify(formData.products));

    let promotion = CartHelper.getPromotion();
    if (promotion.promotion.code) {
      formSubmit.append("promotion", promotion.promotion.code);
    }

    const response = await submitOrder(formSubmit);
    if (response) {
      CartHelper.removePromotion();
      setIsProcessing(false);
      emptyCart();
      moveToStep(stepDone);
      setTimeout(() => {
        moveToStep(stepSubmitInfo);
        closeOrder();
      }, 3000);
    } else {
      setIsProcessing(false);
      SnackbarHelper.show("Đặt hàng thất bại");
    }
  }

  return (
    <div id={ORDER_FORM_NAV} className="overlay nav-right">
      <Header
        hasNavigation={true}
        doNavigation={hideNavigation}
        navId={ORDER_FORM_NAV}
        title="Thông tin đặt hàng"
      />
      {step === stepDone || totalCart > 0 ? (
        <div className="main_container">
          {step !== stepDone ? (
            <>
            </>
          ) : (
            ""
          )}
          {getStep()}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Order;
