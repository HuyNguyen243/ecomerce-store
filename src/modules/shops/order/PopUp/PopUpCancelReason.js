import React , {useState ,useEffect} from 'react';
import { useDispatch,useSelector } from "react-redux";
import { deleteParentOrderProduct } from '../../../../redux/actions';
import ModalService from '../../../../_services/modal';
import { resetPopup } from '../../../../redux/actions';

function PopUpCancelReason(props) {

    const [showPopup, setShowPopup] = useState()
    const [selectedReason,setSelectedReason]=useState(1)
    const [input , setInput] = useState ("")
    const dispatch = useDispatch()
    const modalPopup = useSelector(state => state.modalPopup);

    useEffect(()=>{
        setShowPopup(props.showPopUp)
    },[setShowPopup,props])

    const buttonClose = ()=>{
        setShowPopup(false)
        props.ChangeshowPopup(showPopup)
    }
    console.log(input.trim())
    const buttonSubmit =() =>{
        let id = props.id
        let reason;
        for( let i = 0 ;i < cancelReasons.length ; i++){
            if(selectedReason === cancelReasons[i]["id"]){
                reason = cancelReasons[i]["title"]
            }
        }
        if(selectedReason === 3){
            let result = input.trim()
            if(result === ""){
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
            ModalService.success(modalPopup?.data?.message)
        }else {
            ModalService.error(modalPopup?.data?.message)
        }
        setTimeout(() => {
            dispatch(resetPopup())
        }, 1000);
    }, [modalPopup, dispatch])
    
    React.useEffect(() => {
        if(modalPopup.active) {
            handleAfterSubmit()
        }
    }, [modalPopup, handleAfterSubmit])

    const cancelReasons = [
        {id:1,title: "Muốn thay đổi địa chỉ giao hàng",checked:(selectedReason === 1 ? true :false)},
        {id:2,title: "Đổi ý không muốn mua nữa",checked:(selectedReason === 2 ?true :false)},
        {id:3,title: "Khác:",checked:(selectedReason === 3 ?true :false)},
      ];

    const selectCancelReason = (reason) => {
        setSelectedReason(reason.id)
      }
 
    return (
        <div className={` ${showPopup ? "dialog" : "visibility"}`} >
            <div className='main-container_Popup cancel-swal'>
                <div className='title-swal'>
                    <p>HUỶ ĐƠN HÀNG</p>
                </div>
                <div className='cancel-title'>
                    <p>Tôi muốn huỷ đơn hàng này vì lí do:</p>
                </div>
                <div className='main-container-reason'>
                    {/*  */}
                    <div className='cancel_reason'>
                       {cancelReasons.map((item,value)=>{
                         return(
                            <label className="containerr" key={value} id={item.id}>{item.title} 
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
                    <span className={`txt-danger + ${input === "" && selectedReason === 3 ? "showw" : "hide"}`}>Vui lòng điền thông tin hủy đơn hàng!</span>
                </div>
                <div className='Button-buttom'>
                    <button onClick={buttonClose}>Đóng</button>
                    <button onClick={buttonSubmit}>Đồng ý</button>
                </div>
            </div>
            <span onClick={buttonClose} className='overlay-close'></span>
        </div>
    );
}

export default PopUpCancelReason;