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

  const updateCartQuantity = (e)=>{
    let id = e.target.id
    if(id =="add"){
      quantity +=1
    }
    if(id =="remove"){
      quantity -=1
      
      if(quantity<1){
        quantity = 1
      }
    }
    changeQuantity(quantity)
  }


  const btnQTY = ()=>{
    return(
        <div className="news-style-QTY">
          <div className="col-7 item-quantity ">
            <div className="flex-list quantity-options">
              <span  className="quatiy-title">
                <p>Chọn số lượng:</p>
              </span>
              <span
                className="quantiy-action quantity-minus"
                onClick={updateCartQuantity}
                id="remove"
              >
                <img src="/images/add-.svg" alt="menu_icon" className="remove" id="remove" />
              </span>
              <span>{quantity}</span>
              <span
                className="quantiy-action quantity-add"
                onClick={updateCartQuantity}
                id="add"
              >
                <img src="/images/add+.svg" alt="menu_icon" className="add"  id="add"/>
              </span>
            </div>
          </div>
        </div>
    )
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
          {/* <Icon name="work_outline" /> */}
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
          {/* <Icon name="add_shopping_cart" />
           */}
          <img src="/images/shopping-cart.png" alt="menu_icon" />
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
            className="btn btn-red"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
      {btnQTY()}
      <div className="item-description">
        <label>Thông tin sản phẩm</label>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
