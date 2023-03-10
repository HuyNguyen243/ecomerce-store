import React, { useState, useEffect } from "react";
import Loader from "./../../../_components/_loader.component";
import Header from "../header/Header";
import Blankpage from "./../../../_components/_blankpage.component";
import ProductDetail from "./ProductDetail";
import {
  LIST_CART_NAV,
  PRODUCT_DETAIL_NAV,
} from "./../../../_config/shop.config";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneProduct } from './../../../redux/actions/index';
import { useTranslation } from "react-i18next";
import Spiner from "../../../_helpers/Spinner";


const Detail = ({
  showCart,
  addToCart,
  totalCart,
}) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  let { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(state => state.product);
  const isLoading = useSelector(state => state.isLoading);

  const productCallback = React.useCallback(() => {
    dispatch(getOneProduct(id))
  }, [dispatch, id]);

  useEffect(() => {
    productCallback()
  }, [productCallback]);

  const changeQuantity = (quantity) => {
    if (quantity >= 1) {
      setQuantity(quantity);
    }
  };

  var event;
  // Navigation
  const showNavigation = (elementId) => {
    event = document.createEvent("HTMLEvents");
    let initEvent = `open_navigation_${elementId}`;
    event.initEvent(initEvent, true, true);
    event.eventName = initEvent;
    document.dispatchEvent(event);
    document.getElementsByTagName("html")[0].style.overflow = "auto";
  };

  const showIconcart =()=>{
    showNavigation(LIST_CART_NAV);
  }
  //
  const ref = React.useRef(
  
  React.useEffect(()=>{
    ref.current = true
    return () => ref.current = false;
  })
  )
  return (
    <div id={PRODUCT_DETAIL_NAV}>
      <Header
        hasNavigation={true}
        title= {t("productDetail.tittleDetail")}
        showCart={showIconcart}
        navId={LIST_CART_NAV}
        totalCart={totalCart}
      />
      <div className="main_container detail-product item-info fix-image">
        { isLoading
          ? <Loader />
          : 
            product?.data?.name !== undefined
            ?
              <ProductDetail
                product={product?.data}
                quantity={quantity}
                addToCart={addToCart}
                changeQuantity={changeQuantity}
                forwardRef = {ref}
              />
            : <Blankpage message= {t("error.found")} />
          }
        <Spiner />
      </div>
    </div>
  );
};

export default Detail;
