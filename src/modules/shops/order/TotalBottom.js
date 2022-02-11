import React, { useState }  from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { useLocation } from 'react-router';
import NumberHelper from "./../../../_helpers/number";
import PopUpPromotion from './PopUp/popUpPromotion';
import { useTranslation } from "react-i18next";
import { applyPromotion } from '../../../redux/actions';

function TotalBottom(props) {
    const dispatch = useDispatch()
    const location = useLocation()
    const codePromotion = useSelector(state => state.codePromotion)
    const appliedPromotion = useSelector(state => state.appliedPromotion)
    const isLoading = useSelector(state => state.isLoading);
    const totalCartPrice = useSelector(state => state.totalCartPrice);
    const [showPopUp ,setShowPopUp] = useState(false)
    const shippingFee = useSelector(state => state.shippingFee);
    const promotionVoucher = useSelector(state => state.promotionVoucher);
    const generalData = useSelector(state => state.generalData);
    
    const { t } = useTranslation();
    const showPromotion = () =>{
        setShowPopUp(true)
    }
    const BooleanPopUp = (props)=>{
        setShowPopUp(!props)
    }
    
   const checkPromotion = React.useCallback(()=>{
        let formData = new FormData();
        formData.append('promo_id', codePromotion)
        
        for( let i = 0 ;i < promotionVoucher?.data.length;i++){
            if(codePromotion === promotionVoucher?.data[i].code){
                if(totalCartPrice < promotionVoucher?.data[i].payload.type.value){
                    dispatch(applyPromotion(formData))
                }
            }
        }

        for( let i = 0 ;i < generalData?.data?.banners?.length;i++){
            if(codePromotion === generalData?.data?.banners[i].code){
                if(totalCartPrice < generalData?.data?.banners[i]?.payload.type.value){
                    dispatch(applyPromotion(formData))
                }
            }
        }
   },[promotionVoucher,codePromotion,dispatch,totalCartPrice,generalData])

    React.useEffect(()=>{
        if(codePromotion !== ""){
            checkPromotion()
        }
    },[checkPromotion,codePromotion])

    return (
        <>
            {
                isLoading
                && <div className="overlay-spinner"></div>
            }
            <div className="row cart-total">
                <PopUpPromotion showPopUp={showPopUp} ChangeshowPopup={BooleanPopUp}/>
            <div className={location.pathname === "/cart" ? "row hide" : "row"}>  
                <div className="col-6 text-bold text-sm">{t("totalBottom.promotion")}</div>
                <div className="col-6 text-bold txt-right">
                    <div className='border-promotion'>
                        {/* <input type="text" name="code"   placeholder="Nhập mã giảm giá" className={"btn-discount"} onClick={showPromotion} value={codePromotion? codePromotion.toUpperCase():""}/> */}
                        <span className='code' onClick={showPromotion}>{codePromotion? codePromotion.toUpperCase(): t("totalBottom.placeholderPromotion")}</span>
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