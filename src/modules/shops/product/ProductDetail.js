import React from "react";
import PriceDisplay from "./PriceDisplay";
import ImageDisplay from "./ImageDisplay";
import Slideshow from "./ProductSlideshow";
import { useDispatch } from "react-redux";
import { addCart } from './../../../redux/actions/index';
import CartService from '../../../_services/cart';
import { useHistory } from "react-router";
import SnackbarHelper from './../../../_helpers/snackbar';
import Snackbar from "../../../_components/_snackbar.component";



const ProductDetail = ({ product, quantity, changeQuantity, }) => {
  const history = useHistory()
  const dispatch = useDispatch();

  
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
    if(id === "add"){
      quantity +=1
    }
    if(id === "remove"){
      quantity -=1
      if(quantity<1){
        quantity = 1
      }
    }
    changeQuantity(quantity)
  }

  const addToCart = (showCart = false) =>{
    CartService.add({
      id          : product._id,
      name        : product.name,
      image       : product.image,
      price       : product.price,
      couponPrice : product.couponPrice,
      weight      : product.weight,
      minOrder    : product.minOrder,
      quantity    : quantity
    })
    SnackbarHelper.show('Thêm vào giỏ hàng thành công')
    dispatch(addCart())
    if(showCart) {
      history.push('/cart')
    }
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
        </div>
      </div>
      <div className="group-buttons">
        <div className={`button-left item-button ${blockBtnLeft}`} onClick={()=>addToCart(true)}>
          {/* <Icon name="work_outline" /> */}
          <button type="button" className="btn" >Mua ngay</button>
        </div>
        <div className={`button-right item-button ${blockBtnRight}`} onClick={()=>addToCart()}>
          {/* <Icon name="add_shopping_cart" />
           */}
          <img src="/images/shopping-cart.png" alt="menu_icon" />
          <button type="button" className="btn btn-red" ></button>
        </div>
      </div>
      {btnQTY()}
      <div className="item-description">
        <label>Thông tin sản phẩm</label>
        <p>{product.description}</p>
      </div>
      <Snackbar />
    </div>
  );
};

export default ProductDetail;
