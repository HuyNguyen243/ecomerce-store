import React, { useEffect, useState }   from "react";
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

const MySwal = withReactContent(Swal)

const OderConfirm = ( 
  hideNavigation
  )=>{
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    const carts = useSelector(state => state.carts);
    const oneDeliveryUser = useSelector(state => state.oneDeliveryUser);
    const nearestVendorId = useSelector(state => state.nearestVendorId);
    const isLoading = useSelector(state => state.isLoading);
    const modalPopup = useSelector(state => state.modalPopup);

    useEffect(()=>{
      if(oneDeliveryUser ===""){
        history.goBack()
      }
    })

    const [condition, setCondition] = useState("")
    let dangerTxt = "vui lòng chọn thông tin nhận hàng"        

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
        title="ĐẶT HÀNG"
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
        title: 'XÁC NHẬN ĐẶT HÀNG',
        text: "Bạn có đồng ý đặt đơn hàng này?!",
        icon: 'info',
        confirmButtonText: 'Đồng ý',
        showCancelButton: true,
        cancelButtonText: "Huỷ bỏ"
      }).then((result) => {
        if (result.isConfirmed) {
          let formData = new FormData();
          formData.append('address_id', oneDeliveryUser._id)
          formData.append('vendor_id', nearestVendorId)
          dispatch(createOrder(formData))
        }
      })
    }
  }
  const handleAfterSubmit =  React.useCallback(() => {
    if(modalPopup.data.success) {
        MySwal.fire({
            showConfirmButton : false,
            html :  <div className='confirm-swal'>
                      <img src='/images/thank-you.png' alt='menu_icon' />
                      <h3>ĐẶT HÀNG THÀNH CÔNG</h3>
                      <p>Cám ơn anh/chị { oneDeliveryUser?.fullname } đã đặt hàng. Coca sẽ giao hàng đến bạn trong thời gian sớm nhất.</p>
                    </div>
          })
          setCondition(true)
          history.replace("/orders")
    }else {
      ModalService.error(modalPopup?.data?.message)
    }
    setTimeout(() => {
        dispatch(resetPopup())
      }, 1000);
  }, [modalPopup, dispatch,history, oneDeliveryUser])

  React.useEffect(() => {
    if(modalPopup.active) {
        handleAfterSubmit()
    }
  }, [modalPopup, handleAfterSubmit])

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
                    {oneDeliveryUser?.address}, {oneDeliveryUser?.ward.name}, {oneDeliveryUser?.district.name}, {oneDeliveryUser?.province.name}
              </p>
              <span>Giao hàng hỏa tốc</span>
              <span> Dự kiến giao hàng từ 1 đến 2 ngày!</span>
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
            <span>Thông tin nhận hàng</span>
          </div>
          {showUserInfo()}
          {condition === false &&(
            <span className="txt-danger fix-txt">{dangerTxt}</span>
              )}
          <form className="basic-form" >
            <div className="form-group">
            <div className="nav_label">
                <span>Phương thức vận chuyển</span>
              </div>
                <div className="shipping fix-shipping">
              <span className="shiper" >AhaMove</span>
                </div>
            </div>
          </form>
          <div className="nav_label">
                <span>Thông tin sản phẩm</span>
          </div>
          <div className="news-style-cart style-for-cart list-cart oderinformation new-bottom">
            {showCart()}
          </div>
        </div>
        <div className="fix-bottom">
          <div className="divider"></div>
          <TotalBottom totalPrice={calcTotalPrice()}/>
          <div className="btn-with-icon right-icon">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Xác nhân đặt hàng</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OderConfirm
