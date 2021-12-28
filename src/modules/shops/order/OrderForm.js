import React, { useEffect, useState } from "react";
import Header from "./../header/Header";
import { LIST_CART_NAV } from "./../../../_config/shop.config";
import { useHistory } from "react-router";
import TotalBottom from "./TotalBottom";
import {  useSelector, useDispatch } from "react-redux";
import CartItem from '../cart/CartItem';
import Auth from "../../../_services/auth";
import { getDeliveryUser, checkGetDelivetyUser, getParentInformationDeviveryUser  } from "../../../redux/actions";

const OrderForm = ({ onSubmit, isLoading,
  hideCart,
  totalCart
}) => {
  const dispatch = useDispatch()
  let dangerTxt = "vui lòng chọn thông tin nhận hàng"        
  const [condition, setCondition] = useState("")
  const history = useHistory()
  const handleBack=()=>{
    history.goBack()
  }
  const carts = useSelector(state => state.carts);
  const oneDeliveryUser = useSelector(state => state.oneDeliveryUser);
  const userAddress = useSelector(state => state.userAddress);
  
  const userID = Auth.get().user_id

  const getUserAddress = React.useCallback(() => {
    dispatch(getDeliveryUser(userID))
  }, [dispatch, userID]);

  useEffect(() => {
    if(!userAddress.isLoaded) {
        getUserAddress()
    }else{
      for (let i = 0; i < userAddress?.data.length; i++) {
        if(userAddress?.data[i].is_default === 1){
          if(oneDeliveryUser === "" ){
            dispatch(getParentInformationDeviveryUser(userAddress?.data[i]))
            break;
          }
        }
      }
    }
}, [getUserAddress, userAddress,dispatch,oneDeliveryUser]);


  const showCart=()=>{
    if(carts.length >0){
        return carts.map((item, key)=>{
            return(
                <CartItem index={key} item={item} key={key}/>
            )
        })
    }
  }

  const showDeliveryUser = ()=>{
    if(oneDeliveryUser !== ""){
      return(
        <div className="form-group"  >
          <div className="information">
              <div className="infor-user newstyle">
                  <p>
                      {oneDeliveryUser.fullname}
                  </p>
                  <p>{oneDeliveryUser.phone}</p>
                  <p>{oneDeliveryUser.address},phường {oneDeliveryUser.ward !== undefined && oneDeliveryUser.ward["name"]},
                  quận {oneDeliveryUser.district !== undefined && oneDeliveryUser.district["name"]}
                  , {oneDeliveryUser.province !== undefined && oneDeliveryUser.province["name"]}
                  </p>
              </div>
              <div className="infor-icon newstyle new-display">
                <img src="/images/Back-Black.svg" alt="menu_icon" />
              </div>
          </div>
        </div>
      )
    }
  }

  const handleOnClick =()=>{
    if(oneDeliveryUser === "" ){
      setCondition(false)
    }else{
      setCondition(true)
      history.push("/order-confirmation")
    }
  }

  const handleSlcInforUser =()=>{
    history.push("/user-address")
    dispatch(checkGetDelivetyUser(true))
  }

  return (
    <div id={LIST_CART_NAV} className="nav-right">
      <Header
        doNavigation={hideCart}
        navId={LIST_CART_NAV}
        hasNavigation={true}
        title="THÔNG TIN ĐẶT GIAO HÀNG"
        totalCart={totalCart}
      />
      <div className="main_container">
        <form className="basic-form" >
          <div className="form-group fix-information">
            <div className="nav_label">
              <span>Thông tin giao hàng</span>
            </div>
              <div onClick={handleSlcInforUser}>
                    {
                      oneDeliveryUser._id  !== undefined ? showDeliveryUser()
                      :   
                      <div className="information ">
                        <span>Chọn thông tin nhận hàng</span>
                        <img src="/images/Back-Black.svg" alt="menu_icon" />
                      </div>
                    }
              </div>
              {condition === false &&(
                <span className="txt-danger">{dangerTxt}</span>
              )}
              <div className="nav_label">
                <span>Phương thức vận chuyển</span>
              </div>
              <div className="shipping height">
                      <span>AhaMove</span>
              </div>
            </div>
          </form>
          <div className="nav_label">
                <span>Thông tin sản phẩm</span>
          </div>
          <div className="news-style-cart style-for-cart stl-botom-cart list-cart new-bottom1">
                  {showCart()}
                  
          </div>
        </div>
        <div className="fix-bottom">
              <div>
              <div>
              <div className="divider"></div>
                <TotalBottom />
              </div>
              
              <div className="btn-with-icon right-icon">
                <button type="submit" className="btn btn-primary btn-left-icon " onClick={handleBack}>Quay lại</button>
                <button type="submit" className="btn btn-primary btn-right-icon " onClick ={handleOnClick}>Tiếp tục</button>
              </div>
                
              </div>
        </div>
      </div>
  );
};

export default OrderForm;
