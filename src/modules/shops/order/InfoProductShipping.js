import React, { useState }  from "react";
import Header from "../header/Header";
import { ORDER_FORM_NAV } from "./../../../_config/shop.config";
import { useSelector, useDispatch } from "react-redux";
import NumberHelper from "./../../../_helpers/number";
import PriceDisplay from './../product/PriceDisplay';
import { useParams } from "react-router-dom";
import { 
  STATUS_PENDING_VENDOR_APPROVE,
  STATUS_DENIED_BY_VENDOR,
  STATUS_USER_CANCEL,
  STATUS_IDLE,
  STATUS_ASSIGNING,
  STATUS_ACCEPTED_BY_VENDOR,
  STATUS_IN_PROCESS,
  STATUS_COMPLETED,
  STATUS_CANCELLED
} from './../../../_config/shop.config';
import { getOneOrder } from './../../../redux/actions/index';
import PopUpCancelReason from "./PopUp/PopUpCancelReason";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { addCart } from './../../../redux/actions/index';
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import SnackbarHelper from './../../../_helpers/snackbar';
import CartService from "../../../_services/cart";
import Snackbar from "../../../_components/_snackbar.component";

const MySwal = withReactContent(Swal)


function InfoProductShipping(props) {
  const dispatch = useDispatch()
  let { id } = useParams();
  const [confirmCancel,setConfirmCancel]=useState(false)
  const order = useSelector(state => state.order);
  const isLoading = useSelector(state => state.isLoading);
  const [showPopUp ,setShowPopUp] = useState(false)
  const deleteoderproduct = useSelector(state=>state.deleteoderproduct)
  const { t } = useTranslation();
  const history = useHistory()

   React.useEffect(() => {
    dispatch(getOneOrder(id))
  }, [dispatch, id])

  const getOrderStatus = (status) => {
    switch(status) {
      case STATUS_PENDING_VENDOR_APPROVE:
        return t("inforProductShipping.VENDOR_APPROVE");
      case STATUS_DENIED_BY_VENDOR:
        return t("inforProductShipping.DENIED_BY_VENDOR");
      case STATUS_USER_CANCEL:
        return t("inforProductShipping.USER_CANCEL");
      case STATUS_IDLE:
        return t("inforProductShipping.IDLE");
      case STATUS_ASSIGNING:
        return t("inforProductShipping.ASSIGNING");
      case STATUS_ACCEPTED_BY_VENDOR:
        return t("inforProductShipping.ACCEPTED_BY_VENDOR");
      case STATUS_IN_PROCESS:
        return t("inforProductShipping.PROCESS");
      case STATUS_COMPLETED:
        return t("inforProductShipping.COMPLETED");
      case STATUS_CANCELLED:
        return t("inforProductShipping.CANCELLED");
      default:
        return status
    }
  }
  
  const showCart = () => {
    if(order?.reference_items?.length >0){
        return order?.reference_items?.map((item,value)=>{
            return(
              <div key={value}>
                <div className ="shop-item cart ">
                    <div className ="item-thumbnail">
                    <img className ="thumbnail-img" src={item.image} alt="thumb" />
                    </div>
                    <div className ="item-info">
                        <span className ="item-name">{item.name}</span>
                        <PriceDisplay coupon={item.couponPrice} price={item.price} />
                        <span className ="item-qty">{t("inforProductShipping.qty")} {item.quantity}</span>
                    </div>
                </div>
              </div>
            )
        })
      }else{
        return(
          <span className="error-messenger">{t("error.errorCart")}</span>
        )
    }
  }
  const handleSubmit = ()=>{
    if(order?.status === "PENDING_VENDOR_APPROVE"){
      if(!confirmCancel){
        setShowPopUp(true)
      }else{
        setConfirmCancel(false)
      }
    }

    const handleBtn=(e)=>{
      let name = e.target.className
      if(name === "cancelBtn"){
        MySwal.close()
      }else{
        MySwal.clickConfirm()
      }
    }

    if(order?.status === "USER_CANCEL" ||  order?.status === "CANCELLED" || order?.status === "FAILED" || order?.status === "DENIED_BY_VENDOR" ){
      MySwal.fire({
        icon: 'info',
        showCancelButton: false,
        showConfirmButton: false,
        html : <div className="swal_deleteProduct">
                <div>
                  <p className="text-title">{t("swal.re_order")}</p>
                </div>
                <div className="group-btn">
                  <button className="cancelBtn" onClick={handleBtn}>{t("cart.CloseButton")}</button>
                  <button className="confirmBtn" onClick={handleBtn}>{t("cart.SubmitButton")}</button>
                </div>
              </div>
      }).then(result=>{
        if(result.isConfirmed){
          let index = order.reference_items
          for(let data of index){
            CartService.add({
              id          : data.id,
              name        : data.name,
              image       : data.image,
              price       : data.price,
              couponPrice : data.couponPrice,
              weight      : data.weight,
              minOrder    : data.minOrder,
              quantity    : data.quantity
            })
          }
          dispatch(addCart())
          SnackbarHelper.show(t("productDetail.addCartSuccess"))
          setTimeout(()=>{
            history.replace("/order-infomation")
            deleteoderproduct.isLoaded = false
          },1000)
        }
      })
    }
  } 
 
  const BooleanPopUp = (props)=>{
    setShowPopUp(!props)
  }

  const showheader =()=>{
    return(
      <Header
      hasNavigation={true}
      navId={ORDER_FORM_NAV}
      title= {t("inforProductShipping.title")}
      />
    )
  }

  const getBooleanConfirm = (props) => {
    setConfirmCancel(props)
  }

  const showCancelStatus = () =>{
    if((order?.status === "USER_CANCEL" ||  order?.status === "CANCELLED" || order?.status === "FAILED"  || deleteoderproduct?.isLoaded) && order?.status !== undefined){
      if((deleteoderproduct?.data?.cancel_reason === "Muốn thay đổi địa chỉ giao hàng" 
      || order?.cancel_reason === "Muốn thay đổi địa chỉ giao hàng" ||
      deleteoderproduct?.data?.cancel_reason === "Want to change shipping address?" 
      || order?.cancel_reason === "Want to change shipping address?")){
          return(
            <p>
            {t("inforProductShipping.reason")}: <span className="strong-reason">{t("popUpCancelReason.cancelReasonsOne")}
          </span></p>
        )
      }else if((deleteoderproduct?.data?.cancel_reason === "Đổi ý không muốn mua nữa" 
      || order?.cancel_reason === "Đổi ý không muốn mua nữa"
      || deleteoderproduct?.data?.cancel_reason === "Change your mind and don't want to buy anymore" 
      || order?.cancel_reason === "Change your mind and don't want to buy anymore")){
          return(
            <p>
              {t("inforProductShipping.reason")}: <span className="strong-reason">{t("popUpCancelReason.cancelReasonsTwo")}
            </span></p>
        )
      }else{
        return(
          <p>
          {t("inforProductShipping.reason")}: <span className="strong-reason">{deleteoderproduct?.isLoaded? deleteoderproduct?.data?.cancel_reason : order?.cancel_reason}
        </span></p>
        )
      }
    }
  }

  return (
    <div className="body_wrapper ">
      {
        isLoading
        && <div className="overlay-spinner"></div>
      }
      {showheader()}
      {
        order !== undefined ?
        <>
        <div className="display-flex">
          <div className="main_container">
            <div className="title-inforShip">
              <div className="nav_label">
                <span>{t("inforProductShipping.titleReceive")}</span>
              </div>
            </div>
            <div className="user_info">
                <div className="name_number">
                  <p>{order?.user_info?.name}</p>
                  <span>|</span>
                  <p>{order?.user_info?.mobile}</p>
                </div>
                <p className="address">
                  {order?.user_info?.address}
                </p>
            </div>
            <div className="nav_label style-title">
              <span>{t("inforProductShipping.titleTransport")}</span>
              <span className={order?.status === "USER_CANCEL" ||  order?.status === "CANCELLED" ||  order?.status === "FAILED" || order?.status === "DENIED_BY_VENDOR" ? "show" : "hide"}>
                {t("inforProductShipping.cancelOrder")}
              </span>
            </div>
            <div className="user_info ">
                <p className="shipper">{t("inforProductShipping.shippingUnit")} AhaMove</p>
                <p className={`id-product ${order?.order_id === undefined && "hide"}`}>{t("inforProductShipping.codeOder")} {order?.order_id}</p>
                <p>{t("inforProductShipping.time")}: {order?.delivery_date}</p>
            </div>
            <div className={ `nav_label style-title ${order?.status !== undefined ? "show" : "hide"}`}>
              <span>{t("inforProductShipping.statusOder")}</span>
            </div>
            <div className="user_info">
              <p className={order?.status !== undefined ? "show" : "hide"}>{t("inforProductShipping.status")}: <span className="strong-reason">{deleteoderproduct?.isLoaded? getOrderStatus(deleteoderproduct?.data?.status):getOrderStatus(order?.status)}</span></p>
              {
                order?.status === "DENIED_BY_VENDOR" ?
                <p className={order?.status !== undefined ? "show" : "hide" }>
                {t("inforProductShipping.reason")}: <span className="strong-reason">{t("error.canCelReasonOfVendor")}</span></p>
                  :
                  <>
                  {showCancelStatus()}
                  </>
              }
            </div>
            <div className="nav_label style-title">
              <span>{t("inforProductShipping.oderList")}</span>
            </div>
            <div >
              {
                showCart()
              }
            </div>
          </div>
          <div className="fix-bottom">
            <div className="divider"></div>
              <>
                <div className="row cart-total">
                  <div className="row">
                      <div className="col-6  text-sm ">{t("totalBottom.total")}</div>
                      <div className="col-6 text-bold txt-right">
                          <span className="text-nm">{NumberHelper.formatCurrency(order?.order_info?.total)}</span>
                      </div>
                      {
                          order?.order_info?.shipping_fee > 0
                          &&
                          <>
                              <div className="col-6  text-sm">{t("totalBottom.shippingFee")} {<span className="txt-style">({order?.shipping_info?.distance}km)</span>}</div>
                              <div className="col-6 text-bold txt-right">
                                  <span className="text-nm">+{ NumberHelper.formatCurrency(order?.order_info?.shipping_fee) }</span>
                              </div>
                          </>
                      }
                      {
                          order?.promotion_info?.discount > 0
                          && <>
                                  <div className="col-6  text-sm">{t("totalBottom.promotion")}</div>
                                  <div className="col-6 text-bold txt-right">
                                      <span className="text-nm">-{ NumberHelper.formatCurrency(order?.promotion_info?.discount) }</span>
                                  </div>
                              </>
                      }
                  </div>
                  <div className="row">
                      <div className="col-6 text-bold text-sm new-text">{t("totalBottom.total")}</div>
                      <div className="col-6 text-bold txt-right">
                          <span className="text-nm new-text">{ NumberHelper.formatCurrency(
                              (order?.user_info?.cod + order?.order_info?.shipping_fee ) - (order?.promotion_info?.discount  ? order?.promotion_info?.discount : 0)
                          ) }</span>
                      </div>
                  </div>   
              </div>
            </>
            {
              (order?.status === STATUS_PENDING_VENDOR_APPROVE ||  order?.status === "USER_CANCEL" ||  order?.status === "CANCELLED" || order?.status === "FAILED" || order?.status === "DENIED_BY_VENDOR" ) 
              && <div className={`btn-with-icon right-icon`}>
                      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>{order?.status === STATUS_PENDING_VENDOR_APPROVE ? t("totalBottom.CancelButton") : t("totalBottom.OderButton")}</button>
                </div>
            }
          </div>
        </div>
          <PopUpCancelReason  showPopUp={showPopUp} ChangeshowPopup={BooleanPopUp} comfirm={getBooleanConfirm} id={order?._id}/>
          <Snackbar />
        </>
        :
        <div className="display-flex">
          <div className="main_container">
            <span className="error-messenger">{t("error.found")}</span>
          </div>
        </div>
      }
  
    </div>
  );
}

export default InfoProductShipping;