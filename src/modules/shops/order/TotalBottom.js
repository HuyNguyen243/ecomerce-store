import React, { useState }  from 'react';
import { useSelector} from 'react-redux';
import { useLocation } from 'react-router';
import NumberHelper from "./../../../_helpers/number";
import PopUpPromotion from './PopUp/popUpPromotion';
import { useTranslation } from "react-i18next";

function TotalBottom(props) {
    const location = useLocation()
    const codePromotion = useSelector(state => state.codePromotion)
    const appliedPromotion = useSelector(state => state.appliedPromotion)
    const isLoading = useSelector(state => state.isLoading);
    const totalCartPrice = useSelector(state => state.totalCartPrice);
    const [showPopUp ,setShowPopUp] = useState(false)
    const shippingFee = useSelector(state => state.shippingFee);
    const { t } = useTranslation();
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
                <div className="col-6 text-bold text-sm">{t("totalBottom.promotion")}</div>
                <div className="col-6 text-bold txt-right">
                    <div className='border-promotion'>
                        {/* <input type="text" name="code"   placeholder="Nhập mã giảm giá" className={"btn-discount"} onClick={showPromotion} value={codePromotion? codePromotion.toUpperCase():""}/> */}
                        <button className='code' onClick={showPromotion}>{codePromotion? codePromotion.toUpperCase(): t("totalBottom.placeholderPromotion")}</button>
                    </div>
                </div>
            </div>  
            <div className={ location.pathname === "/cart" ? "row hide" : "row"}>
                <div className="col-6  text-sm ">{t("totalBottom.total1")}</div>
                <div className="col-6 text-bold txt-right">
                    <span className="text-nm">{NumberHelper.formatCurrency(totalCartPrice)}</span>
                </div>
                {
                    shippingFee.total_pay > 0
                    &&
                    <>
                        <div className="col-6  text-sm pding">{t("totalBottom.shippingFee")} {<span className="txt-style">({shippingFee.distance}km)</span>}</div>
                        <div className="col-6 text-bold txt-right">
                            <span className="text-nm">+{ NumberHelper.formatCurrency(shippingFee.total_pay) }</span>
                        </div>
                    </>
                }
                {
                    appliedPromotion?.discount
                    && <>
                            <div className="col-6  text-sm">{t("totalBottom.promotion")}</div>
                            <div className="col-6 text-bold txt-right">
                                <span className="text-nm">-{ NumberHelper.formatCurrency(appliedPromotion?.discount) }</span>
                            </div>
                        </>
                }
                
            </div>
            <div className="row">
                <div className="col-6 text-bold text-sm new-text">{t("totalBottom.total")}</div>
                <div className="col-6 text-bold txt-right">
                    <span className="text-nm new-text">
                    { 
                        shippingFee === 0
                        ?
                            NumberHelper.formatCurrency(totalCartPrice)
                        :
                            NumberHelper.formatCurrency(
                                (totalCartPrice + shippingFee?.total_pay) - (appliedPromotion?.discount ? appliedPromotion?.discount : 0)
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