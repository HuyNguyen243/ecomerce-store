import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIdMosview } from './../../../redux/actions/index';
import Header from "./../header/Header";
import List from "../List";
import {
  LIST_CART_NAV,
} from "./../../../_config/shop.config";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import Spiner from "../../../_helpers/Spinner";
import SpinnerAddToCart from "../../../_helpers/SpinnerAddToCart";

const ProductMostview = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading);
  const mostview = useSelector(state => state.mostview);
  const headerTitles = useSelector(state => state.headerTitles);
  const location = useLocation()
  const { t } = useTranslation();
  const generalData = useSelector(state => state.generalData);
  let fullUrl = window.location.href;
  let url = new URL(fullUrl);
  let keyword = url.searchParams.get("keyword");

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

  const getMostviewCallback = React.useCallback(() => {
    let params = '';
    let fullUrl = window.location.href;
    let url = new URL(fullUrl);
    let categoryId = url.searchParams.get("category_id");

    // if(keyword){
    //   params = '&keyword='+ keyword
    // }
    
    if(categoryId) {
      params = '&category_id='+categoryId
    }
    dispatch(getIdMosview(params))
}, [dispatch]);

  useEffect(() => {
    getMostviewCallback()
  }, [getMostviewCallback]);

  const DataMostView = ()=>{
    let allData= [];
    let productByPromotion = generalData?.data?.productByPromotion
    let productByCategory = generalData?.data?.productByCategory
    for(let i = 0 ; i < productByPromotion?.length; i++){
      allData.push(productByPromotion[i])
    }

    for(let i = 0 ; i < productByCategory?.length; i++){
        for(let index of productByCategory[i]?.products){
          allData.push(index)
        }
    }

    if(mostview.data.length > 0 && !keyword){
            return(
               <>
               <List data={mostview.data}/>
               </>
            )
    }else if(keyword){
        let data2 = []
        for(let index of allData){
          if(index.name.toLowerCase().indexOf(keyword.toLowerCase())!== -1){
            data2.push(index)
          }
        }
        if(data2.length > 0 && keyword){
          return(
            <>
              <List data={data2}/>
            </>
         )
        }else{
            return(
              <span className="error-messenger">{t("error.found")}</span>
            )
        }
    }else{
      return(
        <span className="error-messenger">{t("error.found")}</span>
        )
    }
  }
  
  return (
    <>
      {isLoading && <div className="overlay-spinner"></div>}
      <div >
        <Header
          hasNavigation={true}
          title={location.pathname === "/products" && location.search === "" ? t("home.titlePromoted") :headerTitles}
          showCart={showIconcart}
        />
        <div className="main_container fix-images">
                  {DataMostView()}
        </div>
        <Spiner />
        <SpinnerAddToCart />
        <div id="snackbar" className="">{t("productDetail.addCartSuccess")}</div>
      </div>
    </>
  );
};

export default ProductMostview;
