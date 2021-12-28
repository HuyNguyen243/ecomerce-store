import React, { useEffect, useState }  from 'react';
import Swal from "sweetalert2"
import { useSelector,useDispatch } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import { useLocation } from 'react-router';
import { getPromotionvouchers } from '../../../redux/actions';
import { getOrderShippingFee, applyPromotion, resetPopup  } from '../../../redux/actions';
import NumberHelper from "./../../../_helpers/number";
import ModalService from './../../../_services/modal';

const MySwal = withReactContent(Swal)

function TotalBottom(props) {
    const dispatch = useDispatch()
    const location = useLocation()

    const codePromotion = useSelector(state => state.codePromotion)
    const appliedPromotion = useSelector(state => state.appliedPromotion)
    const oneDeliveryUser = useSelector(state => state.oneDeliveryUser);
    const promotionVoucher = useSelector(state => state.promotionVoucher);
    const shippingFee = useSelector(state => state.shippingFee);
    const isLoading = useSelector(state => state.isLoading);
    const totalCartPrice = useSelector(state => state.totalCartPrice);
    const modalPopup = useSelector(state => state.modalPopup);

    const handleUsePromotion = (id)=>{
        MySwal.clickCancel()
        let formData = new FormData();
        formData.append('promo_id', id)
        dispatch(applyPromotion(formData))
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
    const [searchPromotion,setSearchPromotion] = useState("")

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
        let dataSearchPromotion =[]
        promotionVoucher.data.map((item)=>{
                if(item.code.toLowerCase().indexOf(searchPromotion.toLowerCase()) !== -1){
                    dataSearchPromotion.push(item)
                }
        })
    }
    
    const data =()=>{
        if((promotionVoucher?.data).length === 0){
            return(
                <span>Chưa có voucher nào cả !</span>
            )
        }
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

    const showPromotion = () =>{
        MySwal.fire({
            title: 'MÃ GIẢM GIÁ',
            html:        <div className='promotion'>
                                <input type='text' className='input-promotion' placeholder='Nhập mã giảm giá' 
                                onChange={(e)=>setSearchPromotion(e.target.value)} />
                        
                                <div className="swal-promotion">
                                    {data()}
                                </div>
                        </div>,
            showConfirmButton:false,
            confirmButton: false,
            showCancelButton: true,
            cancelButtonText: "Đóng"
        })
    }

    return (
        <>
            {
                isLoading
                && <div className="overlay-spinner"></div>
            }
            <div className="row cart-total">
            <div className={location.pathname === "/cart" ? "row hide" : "row"}>  
                <div className="col-6 text-bold text-sm">Mã giảm giá:</div>
                <div className="col-6 text-bold txt-right">
                    <div className='border-promotion'>
                        {/* <input type="text" name="code"   placeholder="Nhập mã giảm giá" className={"btn-discount"} onClick={showPromotion} value={codePromotion? codePromotion.toUpperCase():""}/> */}
                        <button className='code' onClick={showPromotion}>{codePromotion? codePromotion.toUpperCase():"Nhập mã giảm giá"}</button>
                    </div>
                </div>
            </div>  
            <div className={ location.pathname === "/cart" ? "row hide" : "row"}>
                <div className="col-6  text-sm ">Tổng tiền hàng:</div>
                <div className="col-6 text-bold txt-right">
                    <span className="text-nm">{NumberHelper.formatCurrency(totalCartPrice)}</span>
                </div>
                {
                    shippingFee > 0
                    &&
                    <>
                        <div className="col-6  text-sm">Phí vận chuyển:</div>
                        <div className="col-6 text-bold txt-right">
                            <span className="text-nm">+{ NumberHelper.formatCurrency(shippingFee) }</span>
                        </div>
                    </>
                }
                {
                    appliedPromotion?.discount
                    && <>
                            <div className="col-6  text-sm">Mã giảm giá</div>
                            <div className="col-6 text-bold txt-right">
                                <span className="text-nm">-{ NumberHelper.formatCurrency(appliedPromotion?.discount) }</span>
                            </div>
                        </>
                }
                
            </div>
            <div className="row">
                <div className="col-6 text-bold text-sm new-text">Tổng cộng:</div>
                <div className="col-6 text-bold txt-right">
                    <span className="text-nm new-text">{ NumberHelper.formatCurrency(
                        (totalCartPrice + shippingFee) - (appliedPromotion?.discount ? appliedPromotion?.discount : 0)
                    ) }</span>
                </div>
            </div>   
            </div> 
        </>
    );
}

export default TotalBottom;