import React from "react";
import Item from "./../product/Item";
import Blankpage from "./../../../_components/_blankpage.component";
// import Icon from './../../../_components/_icon.component';
import{ useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { headTitles } from './../../../redux/actions/index';
import { getCategoriesByParentId } from "./../../../redux/actions/index";


const Slider = ({ data, type, categoryId = '', title, showDetail, getListData, addToCart }) => {
  let productList;
  const history = useHistory()
  const dispatch = useDispatch();

  
  // const doScrolling = (cateId, type) => {
  //   let scrollElement = document.getElementById(cateId)
  //   let scrollItems = scrollElement.getElementsByClassName('active')[0];
  //   let totalScrollItems = Number(scrollElement.getElementsByClassName('horizontal-list-item').length);
  //   scrollItems.classList.remove('active');
  //   let key = Number(scrollItems.getAttribute('item-id'));
  //   let itemWidth = scrollItems.offsetWidth;
  //   let nextKey;
  //   if (type === 'prev') {
  //     scrollElement.scrollLeft -= itemWidth
  //     nextKey = key-1;
  //   }else {
  //     scrollElement.scrollLeft += itemWidth
  //     nextKey = key+1;
  //   }
  //   let nextElement = scrollElement.querySelector('[item-id="'+nextKey+'"]');
  //   if (nextElement) {
  //     nextElement.classList.add('active')
  //   }

  //   if ((totalScrollItems) === nextKey) {
  //     nextKey = 0;
  //     scrollElement.scrollLeft = 0;
  //     scrollElement.querySelector('[item-id="0"]').classList.add('active')
  //   }else{
  //     scrollElement.parentElement.getElementsByClassName('next')[0].classList.remove('hide')
  //   }

  //   if (nextKey === 0) {
  //     scrollElement.parentElement.getElementsByClassName('prev')[0].classList.add('hide')
  //   }else {
  //     scrollElement.parentElement.getElementsByClassName('prev')[0].classList.remove('hide')
  //   }
  // }
  if (data.length > 0) {
    productList = data.map((product, index) => {
      return (
        <div className={`horizontal-list-item`} key={index} item-id={index}>
          <Item addToCart={addToCart} showDetail={showDetail} id={product._id} data={product} />
        </div>
      );
    });
  } else {
    productList = <Blankpage message="Data not found!" />;
  }

  const getByCategory = (id, listTitle) => {
    dispatch(headTitles(listTitle))
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
            <div className="col-4 header-right txt-primary txt-right" ><span className="pointer" onClick={() => { getByCategory(categoryId, title) }}>Xem tất cả</span></div>
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
