import React, { useState }  from 'react';
import { useSelector} from 'react-redux';
import { useLocation } from 'react-router';
import NumberHelper from "./../../../_helpers/number";
import PopUpPromotion from './PopUp/popUpPromotion';

function TotalBottom(props) {
    const location = useLocation()
    const codePromotion = useSelector(state => state.codePromotion)
    const appliedPromotion = useSelector(state => state.appliedPromotion)
    const isLoading = useSelector(state => state.isLoading);
    const totalCartPrice = useSelector(state => state.totalCartPrice);
    const [showPopUp ,setShowPopUp] = useState(false)
    const shippingFee = useSelector(state => state.shippingFee);
    const showPromotion = () =>{
        setShowPopUp(true)
    }
    const BooleanPopUp = (props)=>{
        setShowPopUp(!props)
    }
    return (
        <>
                    <PopUpPromotion showPopUp={showPopUp} ChangeshowPopup={BooleanPopUp}/>

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
                    <span className="text-nm new-text">
                    { 
                        location.pathname === "/cart"
                        ?
                            NumberHelper.formatCurrency(totalCartPrice)
                        :
                            NumberHelper.formatCurrency(
                                (totalCartPrice + shippingFee) - (appliedPromotion?.discount ? appliedPromotion?.discount : 0)
                            )
                    }
                    </span>
                </div>
            </div>   
            </div> 
        </>
    );
}

export default TotalBottom;