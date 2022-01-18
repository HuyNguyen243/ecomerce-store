import React, { useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getPromotionvouchers } from '../../../../redux/actions';
import { getOrderShippingFee ,applyPromotion ,resetPopup } from '../../../../redux/actions';
import ModalService from '../../../../_services/modal';
import { useTranslation } from "react-i18next";

function PopUpPromotion(props) {
    const dispatch = useDispatch()
    const [showPopup, setShowPopup] = useState()
    const oneDeliveryUser = useSelector(state => state.oneDeliveryUser);
    const promotionVoucher = useSelector(state => state.promotionVoucher);
    const shippingFee = useSelector(state => state.shippingFee);
    const modalPopup = useSelector(state => state.modalPopup);
    const [searchPromotion,setSearchPromotion] = useState("")
    const dataSearchPromotion =[]
    const { t } = useTranslation();
    
    useEffect(()=>{
        setShowPopup(props.showPopUp)
        if(showPopup === true){
            if(!promotionVoucher?.isLoaded){
                    dispatch(getPromotionvouchers())
            }  
        }
    },[setShowPopup,props,dispatch,promotionVoucher,showPopup])

    const buttonClose = ()=>{
        setShowPopup(false)
        props.ChangeshowPopup(showPopup)
    }

    const handleUsePromotion = (id)=>{
        let formData = new FormData();
        formData.append('promo_id', id)
        dispatch(applyPromotion(formData))
        setShowPopup(false)
        props.ChangeshowPopup(showPopup)
    }

    const handleAfterSubmit =  React.useCallback(() => {
        if(modalPopup.data.success) {
            ModalService.success(t("popUpPromotion.success"))
        }else {
            ModalService.error(t("popUpPromotion.failed"))
        }
        setTimeout(() => {
            dispatch(resetPopup())
        }, 1000);
    }, [modalPopup, dispatch ,t])
    
    useEffect(()=>{
        if(oneDeliveryUser !== "" && shippingFee === 0 ) {
            dispatch(getOrderShippingFee({address_id : oneDeliveryUser?._id}))
        }
    },[dispatch,promotionVoucher, oneDeliveryUser, shippingFee ])

    React.useEffect(() => {
        if(modalPopup.active) {
            handleAfterSubmit()
        }
    }, [modalPopup, handleAfterSubmit])

    if(searchPromotion.length > 0){
        promotionVoucher.data.map((item)=>{
            if(item.code.toLowerCase().indexOf(searchPromotion.toLowerCase()) !== -1){
                dataSearchPromotion.push(item)
            }
            return item;
        })
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

    const data =()=>{
        if(searchPromotion.length  > 0){
            if(dataSearchPromotion.length > 0){
                return (dataSearchPromotion).map((item,value)=>{
                    return(
                        <div className='container-promotion' key={value} id={item.code}  onClick={e => handleUsePromotion(item._id)}>
                        <div className='Offer-promotion'  >
                            <img src={item.image} alt="sale" />
                            <div className='content-promotion'>
                                <p className='code-promotion'>{item.code}</p>
                                <p className='Minimum-Order'>{item.title}</p>
                                {timeStamp(item.endDate)}
                                </div>
                            </div>
                            <div className='use-promotion'>
                            <span id={item.code} className='button-usePromotion'>{t("popUpPromotion.usePromotion")}</span>
                            </div>
                        </div>
                    )
                })
            }else{
                return(
                    <span className='txt-danger'>{t("error.searchPromotion")}</span>
                )
            }
        }
        if((promotionVoucher?.data).length === 0){
            return(
                <span className='txt-danger'>{t("popUpPromotion.notification")}</span>
            )
        }else{
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
                        <div className='container-promotion' key={value} onClick={e => handleUsePromotion(item._id)} id={item.code}>
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
        }
   
            return (
                <div className={` ${showPopup ? "dialog" : "visibility"}`} >
                    <div className='main-container_Popup'>
                        <div className='title-swal'>
                            <p>{t("popUpPromotion.title")}</p>
                        </div>
                        <div className='input-swal'>
                            <input type="text" className='searchPromotion' name='promotion' placeholder= {t("popUpPromotion.searchPromotion")}
                            onChange={(e)=>setSearchPromotion(e.target.value)}
                            />
                        </div>
                        <div className='main-container-swal'>
                            {/*  */}
                                {data()}
                            {/*  */}
                        </div>
                        <div className='Button-buttom'>
                            <span onClick={buttonClose}>{t("cart.CloseButton")}</span>
                        </div>
                    </div>
                    <span onClick={buttonClose} className='overlay-close'></span>
                </div>
            );
}

export default PopUpPromotion;