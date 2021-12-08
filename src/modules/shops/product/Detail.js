import React, { useState, useEffect } from "react";
import Loader from "./../../../_components/_loader.component";
import Header from "../header/Header";
import Blankpage from "./../../../_components/_blankpage.component";
import ProductDetail from "./ProductDetail";
import {
  LIST_CART_NAV,
  PRODUCT_DETAIL_NAV,
} from "./../../../_config/shop.config";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneProduct } from './../../../redux/actions/index';

const Detail = ({
  showCart,
  addToCart,
  totalCart,
}) => {

  const [quantity, setQuantity] = useState(1);
  let { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(state => state.product);
  const isLoading = useSelector(state => state.isLoading);

  const productCallback = React.useCallback(() => {
    dispatch(getOneProduct(id))
  }, [dispatch, id]);

  useEffect(() => {
    productCallback()
  }, [productCallback]);

  const changeQuantity = (quantity) => {
    if (quantity >= 1) {
      setQuantity(quantity);
    }
  };

  return (
    <div id={PRODUCT_DETAIL_NAV}>
      <Header
        hasNavigation={true}
        title="Thông tin sản phẩm"
        showCart={showCart}
        navId={LIST_CART_NAV}
        totalCart={totalCart}
      />
      <div className="main_container detail-product item-info">
        { isLoading
          ? <Loader />
          : 
            product?.name !== undefined
            ?
              <ProductDetail
                product={product}
                quantity={quantity}
                addToCart={addToCart}
                changeQuantity={changeQuantity}
              />
            : <Blankpage message="Không tìm thấy dữ liệu" />
          }
      </div>
    </div>
  );
};

export default Detail;
