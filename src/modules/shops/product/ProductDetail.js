import React, { useState } from "react";
import PriceDisplay from "./PriceDisplay";
import ImageDisplay from "./ImageDisplay";
import Slideshow from "./ProductSlideshow";
import { useDispatch,useSelector } from "react-redux";
import { addCart } from './../../../redux/actions/index';
import CartService from '../../../_services/cart';
import { useHistory } from "react-router";
import SnackbarHelper from './../../../_helpers/snackbar';
import Snackbar from "../../../_components/_snackbar.component";
import { useTranslation } from "react-i18next";

const ProductDetail = ({ product, quantity, changeQuantity }) => {
  const [confirmAddToCart,setConfirmAddToCart] = useState(true)
  const history = useHistory()
  const dispatch = useDispatch();
  const carts = useSelector(state => state.carts);
  const { t } = useTranslation();

  let image;
  if (product.gallery && product.gallery.length > 0) {
    image = <Slideshow gallery={product.gallery} />;
  } else {
    image = <ImageDisplay src={product.image} alt={product.name} />;
  }
  let quantityShow = product.quantity;
  let blockBtnLeft = "";
  let blockBtnRight = "";
  if (quantityShow !== null) {
    quantityShow = `${product.quantity} ${t("productDetail.stocking")}`;
    if (product.quantity === 0) {
      quantityShow = t("productDetail.outOfStock");
      blockBtnLeft = "button-left-block";
      blockBtnRight = "button-right-block";
    }
  }

  const updateCartQuantity = (e)=>{
    let id = e.target.id
    if(id === "add"){
      quantity += 1
      if(quantity > 99){
        quantity = 99
      }
    }
    if(id === "remove"){
      quantity -= 1
      if(quantity < 1){
        quantity = 1
      }
    }
    changeQuantity(quantity)
  }
    const addToCart = (showCart = false) =>{
        for(let i = 0 ;i < carts.length ;i++){
          if(carts[i]["id"] === product._id){
            if(carts[i]["quantity"] + quantity  > 99 ){
              SnackbarHelper.show(t("productDetail.maxQty"))
              return false
            }
          }
        }
        if(confirmAddToCart){
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
          SnackbarHelper.show(t("productDetail.addCartSuccess"))
          dispatch(addCart())
          setConfirmAddToCart(false)
        }
        if(showCart){
          if(confirmAddToCart){
            history.push('/cart')
          }else{
            setConfirmAddToCart(true)
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
            dispatch(addCart())
            SnackbarHelper.show(t("productDetail.moveCart"))
            setTimeout(()=>{
              history.push('/cart')
            },1500)
          }
        }
    }

    React.useEffect(()=>{
      if(!confirmAddToCart){
        setTimeout(()=>{
          setConfirmAddToCart(true)
          },1500)
      }
    })

  const btnQTY = ()=>{
    return  (
        <div className="news-style-QTY">
        <div className=" item-quantity ">
          <div className="flex-list quantity-options">
            <span  className="quatiy-title ">
              <p>{t("productDetail.selectQty")}</p>
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
          <div className={`button-l ${blockBtnLeft}`} onClick={()=>addToCart(true)}>
            {/* <Icon name="work_outline" /> */}
            <button type="button" className="btn" >{t("home.buttonBuy")}</button>
          </div>
          <div className={`button-r ${blockBtnRight}`} onClick={()=>addToCart()}>
            {/* <Icon name="add_shopping_cart" />
             */}
          
            <button type="button" className="btn btn-red" >
            <img src="/images/shopping-cart.png" alt="menu_icon" />
            <span>{t("home.addToCard")}</span>
            </button>
          </div>
        </div>
        {btnQTY()}
        <div className="item-description">
          <label>{t("productDetail.infomationProduct")}</label>
          <p>{product.description}</p>
        </div>
        <Snackbar />
      </div>
    );
 
};

export default ProductDetail;
