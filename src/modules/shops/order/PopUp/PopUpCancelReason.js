import React , {useState ,useEffect} from 'react';

function PopUpCancelReason(props) {

    const [showPopup, setShowPopup] = useState()
    const [selectedReason,setSelectedReason]=useState(1)

    useEffect(()=>{
        setShowPopup(props.showPopUp)
    },[setShowPopup,props])

    const buttonClose = ()=>{
        setShowPopup(false)
        props.ChangeshowPopup(showPopup)
    }

    const cancelReasons = [
        {id:0,title: "Muốn thay đổi địa chỉ giao hàng",checked:(selectedReason === 0 ?true :false)},
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
                    <div >
                       {cancelReasons.map((item,value)=>{
                         return(
                           <div className='radio' key={value}>
                               <div >
                                 <input onClick={e => selectCancelReason(item) } id={item.id} name="radio" type="radio" />
                                 <label htmlFor={item.id} className="radio-label"></label>
                               </div>
                               <span>{item.title}</span>
                           </div>
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
                                paddingLeft: '15px'
                            }
                            } name="other_reason" type="text" className="form-control" />
                         </div>
                       }
                     </div>
                    {/*  */}
                </div>
                <div className='Button-buttom'>
                    <button onClick={buttonClose}>Đóng</button>
                    <button >Đồng ý</button>
                </div>
            </div>
            <span onClick={buttonClose} className='overlay-close'></span>
        </div>
    );
}

export default PopUpCancelReason;