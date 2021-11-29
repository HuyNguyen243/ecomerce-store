import React from "react";
import PriceDisplay from "./PriceDisplay";
import ImageDisplay from "./ImageDisplay";
import Slideshow from "./ProductSlideshow";
import Icon from "./../../../_components/_icon.component";
import { QUICK_BUY_TYPE } from "./../../../_config/shop.config";

const ProductDetail = ({ product, quantity, changeQuantity, addToCart }) => {
  let image;
  if (product.gallery && product.gallery.length > 1) {
    image = <Slideshow gallery={product.gallery} />;
  } else {
    image = <ImageDisplay src={product.image} alt={product.name} />;
  }

  let quantityShow = product.quantity;
  let blockBtnLeft = "";
  let blockBtnRight = "";
  if (quantityShow !== null) {
    quantityShow = `${product.quantity} sản phẩm có sẵn`;
    if (product.quantity === 0) {
      quantityShow = "Hết hàng";
      blockBtnLeft = "button-left-block";
      blockBtnRight = "button-right-block";
    }
  }

  return (
    <div className="shop-item alt">
      {image}
      <div className="item-info">
        <span className="item-name">{product.name}</span>
        <div className="group-price-quantity">
          <PriceDisplay coupon={product.couponPrice} price={product.price} />
          {product.quantity === 0 ? (
            <span className="quantity over">{quantityShow}</span>
          ) : (
            <span className="quantity">{quantityShow}</span>
          )}
        </div>
      </div>
      <div className="group-buttons">
        <div className={`button-left item-button ${blockBtnLeft}`}>
          <Icon name="work_outline" />
          <button
            type="button"
            onClick={() => {
              if (product.quantity !== 0)
                addToCart(
                  {
                    id: product._id,
                    name: product.name,
                    couponPrice: product.couponPrice,
                    pricePerProduct: product.price,
                    quantity: quantity,
                    image: product.image,
                  },
                  QUICK_BUY_TYPE
                );
            }}
            className="btn"
          >
            Mua ngay
          </button>
        </div>
        <div className={`button-right item-button ${blockBtnRight}`}>
          <Icon name="add_shopping_cart" />
          <button
            type="button"
            onClick={() => {
              if (product.quantity !== 0)
                addToCart({
                  id: product._id,
                  name: product.name,
                  couponPrice: product.couponPrice,
                  pricePerProduct: product.price,
                  quantity: quantity,
                  image: product.image,
                });
            }}
            className="btn"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
      <div className="item-description">
        <label>Thông tin sản phẩm</label>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
