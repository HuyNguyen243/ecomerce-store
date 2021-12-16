import React, { useState }  from "react";
import Header from "../header/Header";
import { ORDER_FORM_NAV } from "./../../../_config/shop.config";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
import TotalBottom from "./TotalBottom";
const MySwal = withReactContent(Swal)

function InfoProductShipping(props) {

  const showCart=()=>{
    const getlocal = JSON.parse(localStorage.getItem("order_6149b1a9c941488634c963cf_4954465131233429"))
    if(getlocal.length >0){
        return getlocal.map((item,value)=>{
            return(
              <div key={value}>
                <div className ="shop-item cart ">
                    <div className ="item-thumbnail">
                    <img className ="thumbnail-img" src={item.image} alt="thumb" />
                    </div>
                    <div className ="item-info">
                        <span className ="item-name ">{item.name}</span>
                        <span className ="item-price style-price">{item.pricePerProduct}</span>
                        <span className ="item-qty">Số lượng: {item.quantity}</span>
                    </div>
                </div>
              </div>
            )
        })
    }
  }

  const [confirmCancel,setConfirmCancel]=useState(false)
  const [id]= useState()

  const cancelReasons =[ {id:0,title: "Muốn thay đổi địa chỉ giao hàng",checked:(id === 0 ?true :false)},
                        {id:1,title: "Thay đổi phương thức vận chuyển",checked:(id === 1 ?true :false)},
                        {id:2,title: "Đổi ý không muốn mua nữa / Khác",checked:(id === 2 ?true :false)},
                      ];

  const handleSubmit = ()=>{
    if(!confirmCancel){
      MySwal.fire({
        title: 'HUỶ ĐƠN HÀNG',
        text: "Tôi muốn huỷ đơn hàng này vì lí do:",
        confirmButtonText: 'Đồng ý',
        showCancelButton: true,
        cancelButtonText: "Huỷ bỏ",
        html :  <div className='cancel-swal'>
                  <p className='cancel-title'>Tôi muốn huỷ đơn hàng này vì lí do:</p>
                    <div>
                      {cancelReasons.map((item,value)=>{
                        return(
                          <div className='radio' key={value}>
                              <div>
                              <input id={item.id} name="radio" type="radio" />
                              <label for={item.id} className="radio-label"></label>
                              </div>
                              <span>{item.title}</span>
                          </div>
                        )
                    })}
                    </div>
                </div>
      }).then((result) => {
        if (result.isConfirmed) {
          setConfirmCancel(true)
        }
      })
    }else{
      setConfirmCancel(false)
    }
} 
  
  const showheader =()=>{
    return(
      <Header
      hasNavigation={true}
      navId={ORDER_FORM_NAV}
      title="THÔNG TIN ĐƠN HÀNG"
      />
    )
  }

  return (
    <div className="body_wrapper ">
      {showheader()}
      <div className="main_container">
        <div className="title-inforShip">
          <div className="nav_label">
            <span>Thông tin nhận hàng</span>
          </div>
          <div className="user_info">
            <div className="name_number">
              <p>Nguyen Van A</p>
              <span>|</span>
              <p>(+84) 905459483</p>
            </div>
              <p className="address">117 Nguyễn Đình Chính, phường 5, quận Phú Nhuận, Hồ Chí Minh</p>
          </div>
          <div className="nav_label style-title">
            <span>Thông tin vận chuyển</span>
            <span className={!confirmCancel ? "hide" : ""}>Đơn đã huỷ</span>
          </div>
          <div className="user_info ">
              <p className="name-shipping">Giao hàng tiết kiệm - Vận chuyển hoả tốc</p>
              <p className="code-product">Mã đơn hàng: 321231</p>
              <p>Thời gian đặt hàng: 12-11-2021 15:00:23</p>
          </div>
        </div>
        <div className="nav_label">
            <span>Thông tin sản phẩm</span>
        </div>
        <div className="news-style-cart style-for-cart list-cart">
          {showCart()}
        </div>
        <div className="fix-bottom">
          <div className="divider"></div>
          <TotalBottom />
          <div className="btn-with-icon right-icon">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>{!confirmCancel ? "Huỷ đơn hàng" : "Đặt lại đơn"}</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default InfoProductShipping;