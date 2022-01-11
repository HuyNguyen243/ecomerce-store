import React, { useState }   from "react";
import CartItem from "../cart/CartItem";
import Header from "../header/Header";
import { ORDER_FORM_NAV } from "./../../../_config/shop.config";
import Swal from "sweetalert2"
import { useHistory, useLocation } from "react-router";
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from "react-redux"; 
import NumberHelper from "./../../../_helpers/number";
import TotalBottom from "./TotalBottom";
import { useDispatch } from "react-redux";
import { createOrder, resetPopup } from './../../../redux/actions/index';
import ModalService from './../../../_services/modal';
import { useTranslation } from "react-i18next";

const MySwal = withReactContent(Swal)

const OderConfirm = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const [submited, setSubmited]  = React.useState(false)
    const { t } = useTranslation();

    const carts = useSelector(state => state.carts);
    const oneDeliveryUser = useSelector(state => state.oneDeliveryUser);
    const nearestVendorId = useSelector(state => state.nearestVendorId);
    const appliedPromotion = useSelector(state => state.appliedPromotion)
    const isLoading = useSelector(state => state.isLoading);
    const modalPopup = useSelector(state => state.modalPopup);

    React.useEffect(()=>{
      if(carts.length === 0){
        history.push('/')
      }
      if(oneDeliveryUser.length === 0){
        history.push('/order-infomation')
      }
    })
    const [condition, setCondition] = useState("")
    let dangerTxt = t("error.errorInformation")       

    const showCart=()=>{
      if(carts.length >0){
          return carts.map((item,key)=>{
              return(
                  <CartItem index={key} key={key} item={item} />
              )
          })
      }
    }

  const showheader =()=>{
    if(location.pathname === "/order-confirmation"){
      return(
        <Header
        hasNavigation={true}
        navId={ORDER_FORM_NAV}
        title= {t("oderConfirm.title")}
        />
      )
    }
  }

  const calcTotalPrice = () => {
    if(carts.length >0){
      let total = 0;
      for (let i = 0; i < carts.length; i++) {
        let price = carts[i].couponPrice > 0 ? carts[i].couponPrice : carts[i].price
        total += price * carts[i].quantity
      }
      return NumberHelper.formatCurrency(total)
    }
  }
  const handleSubmit = () => {
    if(oneDeliveryUser === "" ){
      setCondition(false)
    }else{
      Swal.fire({
        title: t("oderConfirm.swalTitle"),
        text: t("oderConfirm.swalText"),
        icon: 'info',
        confirmButtonText: t("home.buttonBuy"),
        showCancelButton: true,
        cancelButtonText: t("cart.CancelDeleteProduct")
      }).then((result) => {
        if (result.isConfirmed) {
          setSubmited(true)
          let formData = new FormData();
          formData.append('address_id', oneDeliveryUser._id)
          formData.append('vendor_id', nearestVendorId)
          if(appliedPromotion?.discount) {
            formData.append('promo_id', appliedPromotion.id)
          }
          dispatch(createOrder(formData))
        }
      })
    }
  }
  const handleAfterSubmit =  React.useCallback(() => {
    if(modalPopup.data.success) {
      setCondition(true)
      history.push("/orders")
      MySwal.fire({
          showConfirmButton : false,
          html :  <div className='confirm-swal'>
                    <img src='/images/thank-you.png' alt='menu_icon' />
                    <h3>{t("oderConfirm.swalSuccess")}</h3>
                    <p>{t("oderConfirm.textThankFor")}</p>
                  </div>
        })
    }else {
      ModalService.error(modalPopup?.data?.message)
    }
    setTimeout(() => {
        dispatch(resetPopup())
      }, 1000);
  }, [modalPopup, dispatch,history,t])

  React.useEffect(() => {
    if(modalPopup.active && submited) {
        handleAfterSubmit()
    }
  }, [modalPopup, handleAfterSubmit, submited])

  const showUserInfo = ()=>{
    if(oneDeliveryUser !== "" ){
        return(
          <div className="user_info">
            <div className="name_number">
              <p>{oneDeliveryUser.fullname}</p>
              <div>
                <span>|</span> 
                <p>{oneDeliveryUser.phone}</p>
              </div> 
            </div>
              <p className="address">
              {oneDeliveryUser?.address}{parseInt(oneDeliveryUser?.ward.code) === -1 ? "" : `,${oneDeliveryUser?.ward?.name}`}
              ,{oneDeliveryUser?.district?.name},{oneDeliveryUser?.province?.name}
              </p>
              <span>AhaMove</span>
              <span>{t("oderConfirm.expectedDelivery")}</span>
        </div>
        )
    }
  }
  
  return(
    <div className="body_wrapper ">
      {showheader()}
      {
        isLoading
        && <div className="overlay-spinner"></div>
      }
      <div className="display-flex">
        <div className="main_container">
          <div className="nav_label">
            <span>{t("inforProductShipping.titleReceive")}</span>
          </div>
          {showUserInfo()}
          {condition === false &&(
            <span className="txt-danger fix-txt">{dangerTxt}</span>
              )}
          <form className="basic-form" >
            <div className="form-group">
            <div className="nav_label">
                <span>{t("inforProductShipping.titleTransport")}</span>
              </div>
                <div className="shipping fix-shipping">
              <span className="shiper" >AhaMove</span>
                </div>
            </div>
          </form>
          <div className="nav_label">
                <span>{t("productDetail.tittleDetail")}</span>
          </div>
          <div className="news-style-cart style-for-cart list-cart oderinformation new-bottom">
            {showCart()}
          </div>
        </div>
        <div className="fix-bottom">
          <div className="divider"></div>
          <TotalBottom totalPrice={calcTotalPrice()}/>
          <div className="btn-with-icon right-icon">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>{t("oderConfirm.buttonSuccess")}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OderConfirm
