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
import { getProductsearch } from "./../../../redux/actions/index";

const ProductMostview = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading);
  const mostview = useSelector(state => state.mostview);
  const headerTitles = useSelector(state => state.headerTitles);
  const location = useLocation()
  const { t } = useTranslation();
  const generalData = useSelector(state => state.generalData);
  const productSearch = useSelector (state => state.productSearch)
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

  React.useEffect(()=>{
    let allData= [];
    let dataSearch = []
    let productByPromotion = generalData?.data?.productByPromotion
    let productByCategory = generalData?.data?.productByCategory

    for(let i = 0 ; i < productByPromotion?.length; i++){
      allData.push(productByPromotion[i])
    }
    for(let i = 0 ; i < productByCategory?.length; i++){
      for(let index of productByCategory[i]?.products){
        if(index?.discount === 0 || index?.discount === undefined){
          allData.push(index)
        }
      }
    }

    if(allData.length > 0 && keyword){
      let AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ", "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"    
      ];

      for(let index of allData){
        let ChangeProduct = index.name.replace(/[.,#!$%&;:^{}=\-_`~()]/g," ")
        let finalString = ChangeProduct.replace(/\s{2,}/g," ");
        for (let i=0; i<AccentsMap.length; i++) {
            let re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            let char = AccentsMap[i][0];
            finalString = finalString.replace(re, char);
          }
        /// End NameString---------------
        if(keyword?.length > 0){
          let changeKeyword = keyword.replace(/[@.,#!$%&;:^{}=\\/-_`"'~||()*]/g," ")
          let finalKeyword = changeKeyword.replace(/\s{2,}/g," ");
          for (let i = 0; i<AccentsMap.length; i++) {
            let re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            let char = AccentsMap[i][0];
            finalKeyword = finalKeyword.replace(re, char);
          }
          if(finalString.toLowerCase().indexOf(finalKeyword.toLowerCase()) !== -1){
            dataSearch.push(index)
          }
        }
        
      }
    }

    dispatch(getProductsearch(dataSearch))
  },[dispatch,generalData,keyword])

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
    }else if(productSearch.length > 0 && keyword){
      return(
        <>
          <List data={productSearch}/>
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
