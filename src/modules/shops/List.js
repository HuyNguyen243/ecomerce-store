import React, { useEffect, useContext, useState } from "react";
import Header from "./header/Header";
import Item from "./product/Item";
import Loader from "./../../_components/_loader.component";
import Blankpage from "./../../_components/_blankpage.component";
import { ShopContext } from "./../../contexts/ShopContext";
import { LIST_PRODUCT_NAV } from "./../../_config/shop.config";

const List = ({
  params,
  showDetail = "",
  hideList = "",
  title = "Sản phẩm nổi bật",
  addToCart,
}) => {
  // const { products, loading, getList, getListMore, page, hasMore } = useContext(
  //   ShopContext
  // );


  // const [paramFake, setParamFake] = useState();

  // useEffect(() => {
  //   let ele = document.getElementById(LIST_PRODUCT_NAV);
  //   ele.addEventListener("scroll", handleScroll);
  //   return () => ele.removeEventListener("scroll", handleScroll);
  //   eslint-disable-next-line react-hooks/exhaustive-deps
  // }, );

  // useEffect(() => {
  //   setParamFake(params);
    // getList(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [params]);

  // const handleScroll = () => {
  //   let ele = document.getElementById(LIST_PRODUCT_NAV);
  //   if (ele.scrollTop + ele.offsetHeight === ele.scrollHeight) {
  //     if (hasMore) {
  //       let mainContain = ele.children[1];
  //       mainContain.insertAdjacentHTML(
  //         "beforeend",
  //         '<div id="load" class="loader"></div>'
  //       );
  //       getListMore(`${paramFake}&page=${page + 1}`);
  //       document.getElementById("load").remove();
  //     } else {
  //       ele.removeEventListener("scroll", handleScroll);
  //     }
  //   }
  // };
  const showCart=()=>{
      const getlocal = JSON.parse(localStorage.getItem("order_6149b1a9c941488634c963cf_4954465131233429"))
      if (getlocal.length > 0) {
          return  getlocal.map((product, index) => {
          return (
            <div className="horizontal-list-item" id={index} key={index}>
              <Item addToCart={addToCart} showDetail={showDetail} data={product} />
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
        {showCart()}
        {/* {loading ? <Loader /> : productList} */}
        </div>
    </div>
  );
};

export default List;
