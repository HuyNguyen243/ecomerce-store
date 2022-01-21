import React , {useState ,useEffect} from 'react';
import { useDispatch,useSelector } from "react-redux";
import { deleteParentOrderProduct } from '../../../../redux/actions';
import ModalService from '../../../../_services/modal';
import { resetPopup } from '../../../../redux/actions';
import { useTranslation } from "react-i18next";

function PopUpCancelReason(props) {
    const [showPopup, setShowPopup] = useState()
    const [selectedReason,setSelectedReason]=useState(1)
    const [input , setInput] = useState ("")
    const dispatch = useDispatch()
    const modalPopup = useSelector(state => state.modalPopup);
    const { t } = useTranslation();
    const getlang = localStorage.getItem("lang")
    useEffect(()=>{
        setShowPopup(props.showPopUp)
    },[setShowPopup,props])

    const buttonClose = ()=>{
        setShowPopup(false)
        props.ChangeshowPopup(showPopup)
    }
    const buttonSubmit =() =>{
        let id = props.id
        let reason;
        for( let i = 0 ;i < cancelReasons.length ; i++){
            if(selectedReason === cancelReasons[i]["id"]){
                reason = cancelReasons[i]["title"]
            }
        }
        if(selectedReason === 3){
            if(input.replace(/\s/g, "").length === 0){
                return false
            }else{
                reason = input
            }
        }
            let formData = new FormData();
            formData.append("cancel_reason",reason)
            dispatch(deleteParentOrderProduct(id,formData))
            setShowPopup(false)
            props.ChangeshowPopup(showPopup)
            props.comfirm(true)
    }
    const handleAfterSubmit =  React.useCallback(() => {
        if(modalPopup.data.success) {
            ModalService.success(t("popUpPromotion.success"))
        }else {
            if(modalPopup.data?.data?.error) {
                ModalService.error(t(modalPopup.data?.data?.error))
              }else {
                ModalService.error(t("popUpPromotion.failed"))
              }
        }
        setTimeout(() => {
            dispatch(resetPopup())
        }, 1000);
    }, [modalPopup, dispatch,t])
    
    React.useEffect(() => {
        if(modalPopup.active) {
            handleAfterSubmit()
        }
    }, [modalPopup, handleAfterSubmit])

    const cancelReasons = [
        {id:1,title: t("popUpCancelReason.cancelReasonsOne") ,checked:(selectedReason === 1 ? true :false)},
        {id:2,title: t("popUpCancelReason.cancelReasonsTwo"),checked:(selectedReason === 2 ?true :false)},
        {id:3,title: t("popUpCancelReason.cancelReasonsThree"),checked:(selectedReason === 3 ?true :false)},
      ];

    const selectCancelReason = (reason) => {
        setSelectedReason(reason.id)
      }
 
    return (
        <div className={` ${showPopup ? "dialog" : "visibility"}`} >
            <div className='main-container_Popup cancel-swal'>
                <div className='title-swal'>
                    <p>{t("popUpCancelReason.title")}</p>
                </div>
                <div className='cancel-title'>
                    <p className={getlang === "en" ? "txtfix": ""}>{t("popUpCancelReason.reason")}</p>
                </div>
                <div className='main-container-reason'>
                    {/*  */}
                    <div className='cancel_reason'>
                       {cancelReasons.map((item,value)=>{
                         return(
                            <label className={`containerr ${getlang === "en" ? "txtfix2" : ""}`} key={value} id={item.id}>{item.title} 
                                <input type="checkbox" id={item.id} onChange={e => selectCancelReason(item) } checked={item.checked}/>
                                <span className="checkmark" id={item.id}></span>
                            </label>
                         )
                       })}
                       {
                         selectedReason === 3
                         && 
                         <div className='reason-input'>
                            <input style={
                            {
                                height: '35px',
                                width: '240px',
                                padding: '5px 0',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                fontWeight: '300',
                                paddingLeft: '15px',
                            }
                            } maxLength={50} name="other_reason" type="text" className="form-control" onChange={(e)=>setInput(e.target.value)}/>
                         </div>
                       }
                     </div>
                    {/*  */}
                    <span  className={`danger-popup txt-danger + ${input.replace(/\s/g, "").length === 0 && selectedReason === 3 ? "showw" : "hide"}`}>{t("popUpCancelReason.error")}</span>
                </div>
                <div className='Button-buttom'>
                    <span onClick={buttonClose}>{t("cart.CloseButton")}</span>
                    <span onClick={buttonSubmit}>{t("cart.SubmitButton")}</span>
                </div>
            </div>
            <span onClick={buttonClose} className='overlay-close'></span>
        </div>
    );
}

export default PopUpCancelReason;