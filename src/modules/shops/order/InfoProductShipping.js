import React, { useState }  from "react";
import Header from "../header/Header";
import { ORDER_FORM_NAV } from "./../../../_config/shop.config";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import NumberHelper from "./../../../_helpers/number";
import { 
  STATUS_PENDING_VENDOR_APPROVE,
  STATUS_DENIED_BY_VENDOR,
  STATUS_USER_CANCEL,
  STATUS_IDLE,
  STATUS_ASSIGNING,
  STATUS_ACCEPTED_BY_VENDOR,
  STATUS_IN_PROCESS,
  STATUS_COMPLETED,
  STATUS_CANCELLED
} from './../../../_config/shop.config';

import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function InfoProductShipping(props) {
  const history = useHistory()
  const [id]= useState()
  const [confirmCancel,setConfirmCancel]=useState(false)
  const order = useSelector(state => state.order);

  React.useEffect(() => {
    if(Object.keys(order).length === 0) {
      history.push('/orders')
    }
  })

  const getOrderStatus = (status) => {
    switch(status) {
      case STATUS_PENDING_VENDOR_APPROVE:
        return 'Đang chờ nhà phân phối xác nhận đơn hàng';
      case STATUS_DENIED_BY_VENDOR:
        return 'Đơn hàng bị từ chối bởi nhà phân phối';
      case STATUS_USER_CANCEL:
        return 'Bạn đã huỷ đơn hàng này';
      case STATUS_IDLE:
        return 'Xác nhận đơn hàng';
      case STATUS_ASSIGNING:
        return 'Nhà phân phối đang chuẩn bị hàng';
      case STATUS_ACCEPTED_BY_VENDOR:
        return 'Nhà phân phối hoàn tất đơn hàng';
      case STATUS_IN_PROCESS:
        return 'Đang giao hàng';
      case STATUS_COMPLETED:
        return 'Giao hàng thành công';
      case STATUS_CANCELLED:
        return 'Giao hàng thất bại';
      default:
        return status
    }
  }

  const showCart=()=>{
    if(order?.reference_items?.length >0){
        return order?.reference_items?.map((item,value)=>{
            return(
              <div key={value}>
                <div className ="shop-item cart ">
                    <div className ="item-thumbnail">
                    <img className ="thumbnail-img" src={item.image} alt="thumb" />
                    </div>
                    <div className ="item-info">
                        <span className ="item-name">{item.name}</span>
                        <span className ="item-price style-price">{NumberHelper.formatCurrency(item.price)}đ</span>
                        <span className ="item-qty">Số lượng: {item.quantity}</span>
                    </div>
                </div>
              </div>
            )
        })
    }
  }

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
                              <label htmlFor={item.id} className="radio-label"></label>
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
                <p>{order?.user_info?.name}</p>
                <span>|</span>
                <p>{order?.user_info?.mobile}</p>
              </div>
              <p className="address">
                {order?.user_info?.address}
              </p>
          </div>
          <div className="nav_label style-title">
            <span>Thông tin vận chuyển</span>
            <span className={!confirmCancel ? "hide" : ""}>Đơn đã huỷ</span>
          </div>
          <div className="user_info ">
              <p>Đơn vị vận chuyển: AhaMove</p>
              <p className="code-product">Mã đơn hàng: {order?._id}</p>
              <p>Thời gian giao hàng dự kiến: {order?.delivery_date}</p>
          </div>
          <div className="nav_label style-title">
            <span>Trạng thái đơn hàng</span>
          </div>
          <div className="user_info ">
              <p>Trạng thái: { getOrderStatus(order?.status)}</p>
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
            <>
              <div className="row cart-total">
                <div className="row">
                    <div className="col-6  text-sm ">Tổng tiền hàng:</div>
                    <div className="col-6 text-bold txt-right">
                        <span className="text-nm">{NumberHelper.formatCurrency(order?.order_info?.total)}</span>
                    </div>
                    {
                        order?.order_info?.shipping_fee > 0
                        &&
                        <>
                            <div className="col-6  text-sm">Phí vận chuyển:</div>
                            <div className="col-6 text-bold txt-right">
                                <span className="text-nm">+{ NumberHelper.formatCurrency(order?.order_info?.shipping_fee) }</span>
                            </div>
                        </>
                    }
                    {
                        order?.order_info?.discount > 0
                        && <>
                                <div className="col-6  text-sm">Mã giảm giá</div>
                                <div className="col-6 text-bold txt-right">
                                    <span className="text-nm">-{ NumberHelper.formatCurrency(order?.order_info?.discount) }</span>
                                </div>
                            </>
                    }
                </div>
                <div className="row">
                    <div className="col-6 text-bold text-sm new-text">Tổng cộng:</div>
                    <div className="col-6 text-bold txt-right">
                        <span className="text-nm new-text">{ NumberHelper.formatCurrency(
                            order?.user_info?.cod
                        ) }</span>
                    </div>
                </div>   
            </div>
          </>
          {
            order?.status === STATUS_PENDING_VENDOR_APPROVE
            && <div className="btn-with-icon right-icon">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>{!confirmCancel ? "Huỷ đơn hàng" : "Đặt lại đơn"}</button>
              </div>
          }
        </div>
      </div>
      
    </div>
  );
}

export default InfoProductShipping;