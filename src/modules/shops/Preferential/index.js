import React from "react";
import Header from "../header/Header";
import { USER_ORDER_NAV } from "./../../../_config/shop.config";
import { useTranslation } from "react-i18next";
import {
    LIST_CART_NAV,
  } from "./../../../_config/shop.config";
import { useSelector , useDispatch } from "react-redux";
import { applyPromotion, resetPopup } from './../../../redux/actions/index';
import { getCodePromotion } from './../../../redux/actions/index';
import ModalService from './../../../_services/modal';
import { useHistory } from "react-router";
import { getPromotionvouchers } from "../../../redux/actions";

function Preferential(props) {
  const { t } = useTranslation();
  const generalData = useSelector(state => state.generalData);
  const carts = useSelector(state => state.carts);
  const dispatch = useDispatch()
  const history = useHistory()
  const modalPopup = useSelector(state => state.modalPopup);
  const promotionVoucher = useSelector(state => state.promotionVoucher);
  const isLoading = useSelector(state => state.isLoading);

  React.useEffect(()=>{
        if(!promotionVoucher?.isLoaded){
                    dispatch(getPromotionvouchers())
            } 
  })

   // Navigation
  var event;
    const showNavigation = (elementId) => {
    event = document.createEvent("HTMLEvents");
    let initEvent = `open_navigation_${elementId}`;
    event.initEvent(initEvent, true, true);
    event.eventName = initEvent;
    document.dispatchEvent(event);
    document.getElementsByTagName("html")[0].style.overflow = "auto";
  };

  const showIconcart =()=>{
    showNavigation(LIST_CART_NAV);
  }
  //


  const actionUsePromotion = (id) => {
    if(carts.length > 0){
        let formData = new FormData();
        formData.append('promo_id', id)
        dispatch(applyPromotion(formData))
        dispatch(getCodePromotion(id))
    }else{
        ModalService.error(t("error.errorCart"))
        setTimeout(() => {
            dispatch(resetPopup())
        }, 1000);
    }
}
  const showAdventisement =() =>{
    if(generalData?.data?.banners!== undefined){
        return generalData?.data?.banners.map((item,value)=>{
            let findNumber = /\d+k/g;
            let number = []
            let find;
            let description = item.description;
            let title;
            let arrayTitle =[]
            let changeTitle = item.title
            let description2 = []
            while((find = findNumber.exec(item.description)) != null){
                number.push(find[0])
                description2.push(find.input.split("\n"))
            }
            number.forEach(element => {
                description = description.replace(element,"<span style='color:red;font-weight:bold;font-size:13px;padding:0 2px'  >"+ element +"</span>");
            });

            while((title =findNumber.exec(item.title)) != null){
                arrayTitle.push(title[0])
            }
            arrayTitle.forEach(element2 => {
                changeTitle = changeTitle.replace(element2,"<span style='color:red' class='span-element'>"+ element2 +"</span>");
            });
            return(
                <div key={value} >
                    <div className="Offer-Details" onClick={e => actionUsePromotion(item._id)}>
                        <img src={item.image} alt="img" />
                        <div className="Note-Details">
                            <p className="Note-Details-titles" dangerouslySetInnerHTML={{__html: changeTitle}}></p>
                            {/* <p className="Minimum-Order">Đơn tối thiểu : <span>{item?.price}</span></p> */}
                            <p className="Product-Details" dangerouslySetInnerHTML={{__html: description}}></p>
                            <img src="/images/Group227.svg" alt="menu_icon" className="position"/>
                        </div>
                    </div>
                </div>
            )
        })
        }
    }

    const timeStamp=(time)=>{
        let unix_timestamp = time
        let date = new Date(unix_timestamp * 1000);
        let year = date.getFullYear()
        let month = date.getMonth()+ 1;
        let day = date.getDate();
        return(
            <p className='expiry-promotion' >{t("popUpPromotion.Expiry")} {day}/{month}/{year}</p>
        )
    }
  const showPromotion =() =>{
        if(promotionVoucher?.isLoaded){
            return promotionVoucher.data.map((item,value)=>{
                let findNumber = /\d+k/g;
                let number = []
                let find;
                let changeTitle = item.title

                while((find =findNumber.exec(item.title)) != null){
                    number.push(find[0])
                }
                number.forEach(element => {
                    changeTitle = changeTitle.replace(element,"<span style='color:red;font-weight:bold'  >"+ element +"</span>");
                });

                return(
                    <div className='container-promotion' key={value} onClick={e => actionUsePromotion(item._id)} id={item.code}>
                    <div className='Offer-promotion'>
                        <img src={item.image} alt="sale" />
                        <div className='content-promotion'>
                            <p className='code-promotion'>{item.code}</p>
                            <p className='Minimum-Order' dangerouslySetInnerHTML={{__html: changeTitle}}></p>
                            {timeStamp(item.endDate)}
                            </div>
                        </div>
                        <div className='use-promotion'>
                        <span  className='button-usePromotion'>{t("popUpPromotion.usePromotion")}</span>
                        </div>
                    </div>
                )
            })
        }
    }

    const handleAfterSubmit =  React.useCallback(() => {
        if(modalPopup.data.success) {
            ModalService.success(t("popUpPromotion.success"))
            history.push('/order-infomation')
        }else {
            if(modalPopup.data?.data?.error) {
                ModalService.error(t("AfterSubmit",modalPopup.data?.data?.error))
            }else {
                ModalService.error(t("popUpPromotion.failed"))
            }
        }
        setTimeout(() => {
            dispatch(resetPopup())
        }, 1000);
    }, [modalPopup, history, dispatch ,t])

    React.useEffect(() => {
        if(modalPopup.active) {
            handleAfterSubmit()
        }
    }, [modalPopup, handleAfterSubmit])

    return (
        <div className="body_wrapper">
             {
                isLoading
                && <div className="overlay-spinner"></div>
             }
        <Header
          hasNavigation={true}
          showCart={showIconcart}
          navId={USER_ORDER_NAV}
          title= {t("leftNav.Preferential")}
        />
        <div className="main_container">
                <div className="container">
                    {
                        generalData?.data?.banners!== undefined &&
                        <>
                            <div className="Offer-title">
                                <img src="/images/sale.png" alt="menu_icon" />
                                <p>{t("offer.title")}</p>
                            </div>
                                {showAdventisement()}
                        </>
                    }
                    {
                        promotionVoucher?.data?.length > 0 &&
                        <>
                            <div className="Offer-title">
                                <img src="/images/sale.png" alt="menu_icon" />
                                <p>{t("Preferential.title")}</p>
                            </div>
                            <div className='main-container-swal no-over1'>
                                    {showPromotion()}
                            </div>
                        </>
                    }
                    {
                        promotionVoucher?.data?.length === 0 && generalData?.data?.banners === undefined &&
                        <span className='txt-danger'>{t("error.found")}</span>
                    }
                </div>
                </div>
        </div>
    );
}

export default Preferential;