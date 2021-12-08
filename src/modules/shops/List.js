import React from "react";
import Header from "./header/Header";
import Item from "./product/Item";
import { LIST_PRODUCT_NAV } from "./../../_config/shop.config";

const List = ({
  hideList = "",
  title = "Sản phẩm nổi bật",
  addToCart,
}) => {

  const showCart=()=>{
      const getlocal = JSON.parse(localStorage.getItem("order_6149b1a9c941488634c963cf_4954465131233429"))
      if (getlocal.length > 0) {
          return  getlocal.map((product, index) => {
          return (
            <div className="horizontal-list-item" id={index} key={index}>
              <Item addToCart={addToCart} id={product.id} data={product} />
            </div>
          );
        });
      }
  }

  return (
    <div id={LIST_PRODUCT_NAV} className="nav-right">
      <Header
        hasNavigation={true}
        doNavigation={hideList}
        navId={LIST_PRODUCT_NAV}
        title={title}
      />
      <div className="main_container">
        { showCart() }
        </div>
    </div>
  );
};

export default List;
