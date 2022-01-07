import React, { useEffect } from "react";
import Header from "./../header/Header";
import { LIST_CART_NAV } from "./../../../_config/shop.config";
import { useHistory } from "react-router";
import TotalBottom from "./TotalBottom";
import {  useSelector, useDispatch } from "react-redux";
import CartItem from '../cart/CartItem';
import Auth from "../../../_services/auth";
import { getDeliveryUser, checkGetDelivetyUser, getParentInformationDeviveryUser  } from "../../../redux/actions";
import PopUpAdventisement from "./PopUp/PopUpAdventisement";
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import { useTranslation } from "react-i18next";

const OrderForm = ({ onSubmit, isLoading,
  hideCart,
  totalCart
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const handleBack=()=>{
    history.goBack()
  }

  const { t } = useTranslation();
  const MySwal = withReactContent(Swal)
  const carts = useSelector(state => state.carts);
  const oneDeliveryUser = useSelector(state => state.oneDeliveryUser);
  const userAddress = useSelector(state => state.userAddress);
  const shippingFee = useSelector(state => state.shippingFee);
  const delDeliveryUser = useSelector(state => state.delDeliveryUser)
  const putDeliveryUser = useSelector(state => state.putDeliveryUser)
  const userID = Auth.get().user_id
  let dangerTxt = t("oderForm.error2")

  const getUserAddress = React.useCallback(() => {
    dispatch(getDeliveryUser(userID))
  }, [dispatch, userID]);

  React.useEffect(()=>{
    if(carts.length === 0){
      history.push('/')
    }
  })

  useEffect(() => {
    if(!userAddress.isLoaded) {
        getUserAddress()
    }else{
        if(oneDeliveryUser?.length === 0){
          if(userAddress?.data.length > 0){
            for (let i = 0; i < userAddress?.data.length; i++) {
              if(userAddress?.data[i].is_default === 1){
                  dispatch(getParentInformationDeviveryUser(userAddress?.data[i]))
              }else{
                dispatch(getParentInformationDeviveryUser(userAddress?.data[0]))
              }
          }
      }
    }else{
      if(putDeliveryUser?.isLoaded ){
          if(putDeliveryUser?.data?._id === oneDeliveryUser?._id){
            dispatch(getParentInformationDeviveryUser(putDeliveryUser?.data))
        }
      }
    }
      if(delDeliveryUser?.isLoaded || oneDeliveryUser?.isLoaded){
        if(delDeliveryUser?.data?.data?.id === oneDeliveryUser?._id){
          dispatch(getParentInformationDeviveryUser(""))
        }
      }
    }
}, [getUserAddress, userAddress,dispatch,oneDeliveryUser,delDeliveryUser,putDeliveryUser]);
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
    if(oneDeliveryUser !== "" ){
      return(
        <div className="form-group"  >
          <div className="information">
              <div className="infor-user newstyle">
                  <p>
                      {oneDeliveryUser?.fullname}
                  </p>
                  <p>{oneDeliveryUser?.phone}</p>
                  <p>{oneDeliveryUser?.address}
                  {parseInt(oneDeliveryUser?.ward.code) === -1 ? "" : `,${oneDeliveryUser?.ward?.name}`},{oneDeliveryUser?.district?.name},{oneDeliveryUser?.province?.name}
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
    if(oneDeliveryUser !== "" ){
      if(shippingFee === 0){
        MySwal.fire({
          showCloseButton: false,
          showConfirmButton :false,
          showCancelButton :true,
          cancelButtonText: "Đóng",
          icon: 'info',
          title: t("oderForm.error1"),
        })
      }else{
        history.push("/order-confirmation")
      }
    }else{
      MySwal.fire({
        showCloseButton: false,
        showConfirmButton :false,
        showCancelButton :true,
        cancelButtonText: "Đóng",
        icon: 'info',
        title: t("oderForm.error2"),
      })
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
        title= {t("oderForm.title")}
        totalCart={totalCart}
      />
            {PopUpAdventisement()}
      <div className="display-flex">
        <div className="main_container">
        <form className="basic-form" >
          <div className="form-group fix-information">
            <div className="nav_label">
              <span>{t("oderForm.informationDelivery")}</span>
            </div>
              <div onClick={handleSlcInforUser}>
                    {
                      oneDeliveryUser?._id  !== undefined ? showDeliveryUser()
                      :   
                      <div className="information">
                        <span className="fix-information2">{t("oderForm.SelectinformationDelivery")}</span>
                        <img src="/images/Back-Black.svg" alt="menu_icon" />
                      </div>
                    }
              </div>
              {oneDeliveryUser === "" &&(
                <span className="txt-danger">{dangerTxt}</span>
              )}
              <div className="nav_label">
                <span>{t("oderForm.shippingMethod")}</span>
              </div>
              <div className="shipping height">
                <span>AhaMove</span>
              </div>
            </div>
          </form>
          <div className="nav_label">
            <span>{t("productDetail.infomationProduct")}</span>
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
              <button type="submit" className="btn btn-primary btn-left-icon " onClick={handleBack}>{t("oderForm.backButton")}</button>
              <button type="submit" className="btn btn-primary btn-right-icon" onClick ={handleOnClick}>{t("oderForm.nextButton")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
