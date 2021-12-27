import React from "react";
import PriceDisplay from "./../product/PriceDisplay";
import ImageDisplay from "./../product/ImageDisplay";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import CartService from '../../../_services/cart';
import { addCart } from './../../../redux/actions/index';
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content';

const CartItem = ({item,index}) => {
  const MySwal = withReactContent(Swal)
  const history = useHistory();
  const dispatch = useDispatch();

  const updateQuantity = (quantity) => {
    if(quantity === 0) {
      CartService.remove(index);
    }else {
      if(quantity > 99){
        quantity = 99
      }
      CartService.updateQuantity(index, quantity)
    }
    dispatch(addCart())
  }

  const removeCartItem = () => {
    MySwal.fire({
      text: "Bạn có đồng ý xóa sản phẩm này khỏi giỏ hàng ?!",
      icon: 'info',
      confirmButtonText: 'Đồng ý',
      showCancelButton: true,
      cancelButtonText: "Huỷ bỏ"
    }).then((result)=>{
        if(result.isConfirmed){
          CartService.remove(index);
          dispatch(addCart())
        }
    })

  }

  return (
    <div className="shop-item cart">
      <ImageDisplay src={item.image} alt={item.name} />
      <div className="item-info">
        <span
          className="item-name"
          onClick={(e) => history.push('/product/'+item.id)}
        >
          {item.name}
        </span>
        <div className="news-style-QTY">
          <PriceDisplay coupon={item.couponPrice} price={item.price} />
          <div className="col-7 item-quantity flex-list">
            <div className="flex-list quantity-options">
              <span
                className="quantiy-action quantity-minus"
                onClick={() => updateQuantity(item.quantity - 1)}
              >
                <img src="/images/add-.svg" alt="menu_icon" className="add" />

              </span>
              <span>{item.quantity}</span>
              <span
                className="quantiy-action quantity-add"
                onClick={() => updateQuantity(item.quantity + 1)}
              >
                <img src="/images/add+.svg" alt="menu_icon" className="add" />
              </span>
            </div>
            <div
              className="col-2"
              onClick={() => {
                removeCartItem();
              }}
            >
              <img src="/images/delete.svg" alt="menu_icon" className="delete" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
