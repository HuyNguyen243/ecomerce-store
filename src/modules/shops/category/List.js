import React, { useEffect } from "react";
import Slider from './../home/Slider';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesByParentId } from './../../../redux/actions/index';
import Header from "./../header/Header";
import {
  LIST_CART_NAV,
} from "./../../../_config/shop.config";
import { useTranslation } from "react-i18next";
import Spiner from "../../../_helpers/Spinner";
import SpinnerAddToCart from "../../../_helpers/SpinnerAddToCart";


const ListCategory = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
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

  const isLoading = useSelector(state => state.isLoading);
  const categories = useSelector(state => state.categories);
  const getTitleCategories = useSelector(state =>state.getTitleCategories)

  const getCategoriesCallback = React.useCallback(() => {
    dispatch(getCategoriesByParentId(id))
}, [dispatch, id]);
  useEffect(() => {
    if(!categories.isLoaded) {
      getCategoriesCallback()
    }
  }, [getCategoriesCallback, categories,]);
  return (
    <div>
      <Header
        hasNavigation={true}
        title={getTitleCategories.name}
        showCart={showIconcart}

      />
      <div className="main_container fix-image">
        {
          isLoading && categories.isLoaded
          ? <div className="overlay-spinner "></div>
          : 
            <>
              {
                categories?.data?.length > 0
                && categories?.data?.map((category, index) => {
                  return (
                    <Slider key={index} type={'products'} categoryId={category._id} data={category.products} title={category.name} />
                  );
                })
              }
            </>
        }
        <Spiner />
        <SpinnerAddToCart />
        <div id="snackbar" className="">{t("productDetail.addCartSuccess")}</div>
      </div>
    </div>
  );
};

export default ListCategory;
