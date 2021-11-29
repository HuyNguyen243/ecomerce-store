import React from "react";
import ImageDisplay from '../product/ImageDisplay';
import PriceDisplay from '../product/PriceDisplay';
import Blankpage from '../../../_components/_blankpage.component';

const OrderProductDetail = ({ products, status }) => {
  let productList;
  if (products.length > 0) {
    productList = products.map((product, index) => {
      return (
        <div
          style={{ position: "relative" }}
          className="horizontal-list-item"
          key={index}
        >
          <div className="shop-item">
            <ImageDisplay src={product.image} alt={product.name} />
            <div className="item-info">
              <span className="item-name">{product.name}</span>
              <div>
                <PriceDisplay
                  coupon={product.couponPrice}
                  price={product.pricePerProduct}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              color: "#5b5b5b",
              fontWeight: "bold",
              fontSize: "13px",
              position: "absolute",
              bottom: "5px",
              left: "35px"
            }}
          >
          </div>
        </div>
      );
    })
    return (
      <div>{productList}</div>
    )
  }else {
    return (
      <Blankpage message='Không tìm thấy' />
    )
  }
};

export default OrderProductDetail;
