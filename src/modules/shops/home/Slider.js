import React from "react";
import Item from "./../product/Item";
import Blankpage from "./../../../_components/_blankpage.component";
// import Icon from './../../../_components/_icon.component';
import{ useHistory , useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { headTitles } from './../../../redux/actions/index';
import { getCategoriesByParentId } from "./../../../redux/actions/index";
import { getParentTitleCategories } from "./../../../redux/actions/index";
import { useTranslation } from "react-i18next";

const Slider = ({ data, type, categoryId = '', title, showDetail, getListData, addToCart }) => {
  let productList;
  const history = useHistory()
  const dispatch = useDispatch();
  const location = useLocation()
  const { t } = useTranslation();
  const generalData = useSelector(state => state.generalData?.data.productByCategory);

  if (data.length > 0) {
    productList = data.map((product, index) => {
      return (
        <div className={`horizontal-list-item`} key={index} item-id={index}>
          <Item addToCart={addToCart} showDetail={showDetail} id={product._id} data={product} />
        </div>
      );
    });
  } else {
    productList = <Blankpage message={t("error.found")} />;
  }

  const getByCategory = (id, listTitle) => {
    dispatch(headTitles(listTitle))
    if(location.pathname === "/"){
      for( let index of generalData){
        if(id === index._id){
          dispatch(getParentTitleCategories(index))
        }
      }
    }
    if(type === "products"){
      let url = '/products';
      if(categoryId !== '') {
        url += '?category_id='+categoryId;
      }
      history.push(url);
    }else{
      history.push(`/categories/${categoryId}`);
      dispatch(getCategoriesByParentId(id))
    }
    
  }
  return (
    <div className="horizontal-wrapper">
        <div className="horizontal-header row">
            <div className="col-8 header-left text-bold">{title}</div>
            <div className="col-4 header-right txt-primary txt-right" ><span className="pointer" onClick={() => { getByCategory(categoryId, title) }}>{t("home.viewAll")}</span></div>
        </div>
        <div>
            {/* <span onClick={() => {doScrolling(categoryId, 'prev')}} className="list-navigate prev hide"><Icon name="chevron_left" /></span> */}
            {/* <span onClick={() => {doScrolling(categoryId, 'next')}} className={`list-navigate next next-style ${data.length < 3 ? 'hide' : ''}`}><Icon name="chevron_right" /></span> */}
            <div id={categoryId} className="horizontal-list">
              {productList}
            </div>
        </div>
    </div>
  );
}

export default Slider;
