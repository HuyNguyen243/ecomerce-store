import React, { useState, useContext, useEffect } from "react";
import Loader from "./../../../_components/_loader.component";
import Header from "../header/Header";
import Blankpage from "./../../../_components/_blankpage.component";
import { ShopContext } from "./../../../contexts/ShopContext";
import ProductDetail from "./ProductDetail";
import {
  LIST_CART_NAV,
  PRODUCT_DETAIL_NAV,
} from "./../../../_config/shop.config";

const Detail = ({
  isShowDetail,
  detailEl,
  hideDetail,
  showCart,
  id,
  addToCart,
  totalCart,
}) => {
  const { product, loading, getById } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);

  let detail;
  useEffect(() => {
    if (isShowDetail) {
      getById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const changeQuantity = (quantity) => {
    if (quantity >= 1) {
      setQuantity(quantity);
    }
  };

  if (product) {
    detail = (
      <ProductDetail
        product={product}
        quantity={quantity}
        addToCart={addToCart}
        changeQuantity={changeQuantity}
      />
    );
  } else {
    detail = <Blankpage message="Không tìm thấy dữ liệu" />;
  }

  return (
    <div id={PRODUCT_DETAIL_NAV} className="overlay nav-right">
      <Header
        doNavigation={hideDetail}
        hasNavigation={true}
        title="Thông tin sản phẩm"
        showCart={showCart}
        navId={LIST_CART_NAV}
        totalCart={totalCart}
      />
      <div className="main_container detail-product item-info">
        {loading ? <Loader /> : detail}
      </div>
    </div>
  );
};

export default Detail;
