import React, {useEffect, useContext} from 'react';
import Item from './Item';
import Loader from './../../../_components/_loader.component';
import Blankpage from './../../../_components/_blankpage.component';
import {ShopContext} from './../../../contexts/ShopContext';


const Product = ({params, showDetail, showCart}) => {
  const { products, loading, getList } = useContext(ShopContext);
  useEffect(() => {
    getList(params);
  }, [params]);

  let productList;
  if (products.length > 0) {
    productList = products.map((product, index) => {
      return (
        <div className="horizontal-list-item" key={index}>
          <Item showDetail={showDetail} data={product} />
        </div>
      )
    });
  }else {
    productList = <Blankpage message="Không tìm thấy" />
  }

  return (
    <div className="main_container">
      <div className="horizontal-list">
        {loading ? <Loader /> : productList}
      </div>
    </div>
  );
}

export default Product;
