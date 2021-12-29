import React, { useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getPromotionvouchers } from '../../../../redux/actions';
import { getOrderShippingFee ,applyPromotion ,resetPopup } from '../../../../redux/actions';
import ModalService from '../../../../_services/modal';

function PopUpPromotion(props) {
    const dispatch = useDispatch()
    const [showPopup, setShowPopup] = useState()
    
    const oneDeliveryUser = useSelector(state => state.oneDeliveryUser);
    const promotionVoucher = useSelector(state => state.promotionVoucher);
    const shippingFee = useSelector(state => state.shippingFee);
    const modalPopup = useSelector(state => state.modalPopup);
    
    const [searchPromotion,setSearchPromotion] = useState("")
    const dataSearchPromotion =[]

    useEffect(()=>{
        setShowPopup(props.showPopUp)
        if(!promotionVoucher?.isLoaded){
            dispatch(getPromotionvouchers())
        }     
    },[setShowPopup,props,dispatch,promotionVoucher])

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
            ModalService.success(modalPopup?.data?.message)
        }else {
            ModalService.error(modalPopup?.data?.message)
        }
        setTimeout(() => {
            dispatch(resetPopup())
        }, 1000);
    }, [modalPopup, dispatch])

    useEffect(()=>{
        if(!promotionVoucher?.isLoaded){
            dispatch(getPromotionvouchers())
        }
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
    const data =()=>{
        if((promotionVoucher?.data).length === 0){
            return(
                <span className='txt-danger'>Chưa có voucher nào cả !</span>
            )
        }

        if(dataSearchPromotion.length  > 0){
            return (dataSearchPromotion).map((item,value)=>{
                return(
                    <div className='container-promotion' key={value}>
                    <div className='Offer-promotion'>
                        <img src={item.image} alt="sale" />
                        <div className='content-promotion'>
                            <p className='code-promotion'>{item.code}</p>
                            <p className='Minimum-Order'>{item.title}</p>
                            <p className='expiry-promotion'>Hạn sử dụng: 30/11/2021</p>
                            </div>
                        </div>
                        <div className='use-promotion'>
                        <span onClick={e => handleUsePromotion(item._id)} id={item.code} >Sử dụng ngay</span>
                        </div>
                    </div>
                )
            })
        }else{
            if(promotionVoucher?.isLoaded){
                return promotionVoucher.data.map((item,value)=>{
                    return(
                        <div className='container-promotion' key={value}>
                        <div className='Offer-promotion'>
                            <img src={item.image} alt="sale" />
                            <div className='content-promotion'>
                                <p className='code-promotion'>{item.code}</p>
                                <p className='Minimum-Order'>{item.title}</p>
                                <p className='expiry-promotion'>Hạn sử dụng: 30/11/2021</p>
                                </div>
                            </div>
                            <div className='use-promotion'>
                            <span onClick={e => handleUsePromotion(item._id)} id={item.code} >Sử dụng ngay</span>
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
                    <p>MÃ GIẢM GIÁ</p>
                </div>
                <div className='input-swal'>
                    <input type="text" className='searchPromotion' name='promotion' placeholder='Nhập mã giảm giá'
                    onChange={(e)=>setSearchPromotion(e.target.value)}
                    />
                </div>
                <div className='main-container-swal'>
                    {/*  */}
                        {data()}
                    {/*  */}
                </div>
                <div className='Button-buttom'>
                    <button onClick={buttonClose}>Đóng</button>
                </div>
            </div>
            <span onClick={buttonClose} className='overlay-close'></span>
        </div>
    );
}

export default PopUpPromotion;