import React from "react";
import Item from "./product/Item";
import { LIST_PRODUCT_NAV } from "./../../_config/shop.config";


const List = ({
  data,
  addToCart,
}) => {
  const showCart=()=>{
      if (data.length > 0) {
          return  data.map((product, index) => {
          return (
            <div className="horizontal-list-item" id={index} key={index}>
              <Item addToCart={addToCart} id={product._id} data={product} />
            </div>
          );
        });
      }
  }

  return (
    <div id={LIST_PRODUCT_NAV} className="nav-right">
        { showCart() }
    </div>
  );
};

export default List;
