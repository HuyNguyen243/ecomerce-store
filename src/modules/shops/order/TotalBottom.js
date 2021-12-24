import React, { useEffect }  from 'react';
import Swal from "sweetalert2"
import { useSelector,useDispatch } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import { useLocation } from 'react-router';
import { getPromotionvouchers } from '../../../redux/actions';
import { getCodePromotion } from '../../../redux/actions';
const MySwal = withReactContent(Swal)



function TotalBottom(props) {
    const dispatch = useDispatch()
    const location = useLocation()

    const codePromotion = useSelector(state=>state.codePromotion)
    useEffect(()=>{
        dispatch(getPromotionvouchers())
    },[dispatch])

    const promotionVoucher = useSelector(state=>state.promotionVoucher)
    
    const handleUsePromotion =(e)=>{
        dispatch(getCodePromotion(e.target.id))
        MySwal.clickCancel()
    }

    const data =()=>{
        if((promotionVoucher?.data).length === 0){
            return(
                <span>chưa có voucher nào cả !</span>
            )
        }
        if(promotionVoucher?.isLoaded){
            return (promotionVoucher.data).map((item,value)=>{
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
                        <span onClick={handleUsePromotion} id={item.code} >Sử dụng ngay</span>
                        </div>
                    </div>
                )
            })
        }
    }

    const showPromotion =()=>{
        MySwal.fire({
            title: 'MÃ GIẢM GIÁ',
            html: <div className='promotion'> 
                        <input type='text' className='input-promotion' placeholder='Nhập mã giảm giá'/>
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
            <div className="row cart-total">
            <div className={location.pathname === "/cart" || location.pathname === "/product-shipping" ? "row hide" : "row"}>  
                <div className="col-6 text-bold text-sm">Mã giảm giá:</div>
                <div className="col-6 text-bold txt-right">
                    <input type="text" name="code"   placeholder="Nhập mã giảm giá" className={"btn-discount"} onClick={showPromotion} defaultValue={codePromotion? codePromotion.toUpperCase():""}/>
                </div>
            </div>  
            <div className={location.pathname === "/oderInformation"|| location.pathname === "/OderForm"||location.pathname === "/cart" ? "row hide" : "row"}>
                <div className="col-6  text-sm ">Tổng tiền hàng:</div>
                <div className="col-6 text-bold txt-right">
                    <span className="text-nm">{props.totalPrice}</span>
                </div>
                <div className="col-6  text-sm">Phí vận chuyển:</div>
                <div className="col-6 text-bold txt-right">
                    <span className="text-nm">0</span>
                </div>
                <div className="col-6  text-sm">Mã giảm giá</div>
                <div className="col-6 text-bold txt-right">
                    <span className="text-nm">0</span>
                </div>
            </div>
            <div className={location.pathname === "/oderInformation"|| location.pathname === "/OderForm" ? "row hide" : "row"}>
                <div className="col-6 text-bold text-sm new-text">Tổng cộng:</div>
                <div className="col-6 text-bold txt-right">
                    <span className="text-nm new-text">{props.totalPrice}</span>
                </div>
            </div>   
            </div> 
     </>
    );
}

export default TotalBottom;