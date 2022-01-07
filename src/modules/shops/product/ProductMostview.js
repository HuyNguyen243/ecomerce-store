import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIdMosview } from './../../../redux/actions/index';
import Header from "./../header/Header";
import List from "../List";
import {
  LIST_CART_NAV,
} from "./../../../_config/shop.config";
import { useTranslation } from "react-i18next";

const ProductMostview = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading);
  const mostview = useSelector(state => state.mostview);
  const headerTitles = useSelector(state => state.headerTitles);
  const { t } = useTranslation();

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
    let keyword = url.searchParams.get("keyword");

    if(keyword){
      params = '&keyword='+ keyword
    }

    if(categoryId) {
      params = '&category_id='+categoryId
    }
    dispatch(getIdMosview(params))
}, [dispatch]);

  useEffect(() => {
    getMostviewCallback()
  }, [getMostviewCallback]);

  const DataMostView = ()=>{
    if(mostview.data.length > 0){
            return(
               <>
               <List data={mostview.data}/>
               </>
            )
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
          title={headerTitles}
          showCart={showIconcart}
        />
        <div className="main_container fix-images">
                  {DataMostView()}
        </div>
        <div id="snackbar" className="">{t("productDetail.addCartSuccess")}</div>
      </div>
    </>
  );
};

export default ProductMostview;
