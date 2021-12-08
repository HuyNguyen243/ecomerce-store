import React from "react";
import { useForm } from "react-hook-form";
import Loader from "./../../../_components/_loader.component";

import{Link} from "react-router-dom"
import Header from "./../header/Header";
import { LIST_CART_NAV } from "./../../../_config/shop.config";
import { useHistory } from "react-router";

const OrderForm = ({ onSubmit, isLoading,
  hideCart,
  totalCart
}) => {
  const { register, handleSubmit, errors } = useForm();
  // let emptyErrorTxt = 'Vui lòng điền thông tin';
  // let phoneErrorTxt = 'Số điện thoại không hợp lệ';
  const history = useHistory()
  const handleBack=()=>{
    history.push("/cart")
  }


  return (
    <div id={LIST_CART_NAV} className="nav-right">
       <Header
        doNavigation={hideCart}
        navId={LIST_CART_NAV}
        hasNavigation={true}
        title="Giỏ hàng"
        totalCart={totalCart}
      />
      <div className="main_container">
        <form className="basic-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div className="nav_label">
              <span>Thông tin giao hàng</span>
            </div>
            <Link to="/user-address" >
              <div className="information">
                <span>Chọn thông tin nhận hàng</span>
                <img src="/images/Back-Black.svg" alt="menu_icon" />
              </div>
            </Link>
            <div className="nav_label">
              <span>Phương thức vận chuyển</span>
            </div>
            <Link to="/select-shipping" >
            <div className="shipping">
              <span>Phương thức vận chuyển (Giao hàng tiết kiệm)</span>
              <img src="/images/Back-Black.svg" alt="menu_icon" />
            </div>
            </Link>
          </div>
          <div className="fix-bottom">
            <div>
            <div>
            <div className="divider"></div>
              <div className="row cart-total-info">
                <div className="col-6 text-bold text-sm">Mã giảm giá:</div>
                <div className="col-6 text-bold txt-right">
                    <input type="text" name="code"  placeholder="Nhập mã giảm giá" className="btn-discount" />
                </div>
              </div>
            </div>
            
            <div className="btn-with-icon right-icon">
              <button type="submit" className="btn btn-primary btn-left-icon " onClick={handleBack}>Quay lại</button>
              <Link to="/oderInformation"><button type="submit" className="btn btn-primary btn-right-icon ">Tiếp tục</button></Link>
              {/* <button type="submit" className="btn btn-primary btn-right-icon">Tiếp tục</button> */}
            </div>
              
            </div>
          </div>
        </form>
      </div>
      {isLoading 
        ? 
            <Loader /> 
        :
        // <form className="basic-form" onSubmit={handleSubmit(onSubmit)}>
        //   <div className="form-group">
        //     <input
        //       type="text"
        //       name="customerName"
        //       className="app-input"
        //       placeholder="Tên người nhận"
        //       ref={register({ required: true })}
        //       defaultValue={user.username}
        //     />
        //     {errors.customerName && (
        //       <span className="txt-danger">{emptyErrorTxt}</span>
        //     )}
        //   </div>
        //   <div className="form-group">
        //     <input
        //       type="number"
        //       name="customerPhone" 
        //       className="app-input"
        //       placeholder="Số điện thoại"
        //       ref={register({
        //         required: true,
        //         pattern: /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
        //       })}
        //       defaultValue={user.phone}
        //     />
        //     {errors.customerPhone && errors.customerPhone.type === "required" && (
        //       <span className="txt-danger">{emptyErrorTxt}</span>
        //     )}
        //     {errors.customerPhone && errors.customerPhone.type === "pattern" && (
        //       <span className="txt-danger">{phoneErrorTxt}</span>
        //     )}
        //   </div>
        //   <div className="form-group">
        //     <input
        //       type="text"
        //       name="customerAddress"
        //       className="app-input"
        //       placeholder="Địa chỉ"
        //       ref={register({ required: true })}
        //       defaultValue={user.address}
        //     />
        //     {errors.customerAddress && (
        //       <span className="txt-danger">{emptyErrorTxt}</span>
        //     )}
        //   </div>
        //   <div className="form-group">
        //     <textarea name="note" className="app-input" placeholder="Ghi chú" ref={register} />
        //   </div>
        //   <div className="fix-bottom">
        //     <div className="btn-with-icon right-icon">
        //       <button type="submit" className="btn btn-primary">Tiếp tục</button>
        //       <Icon name="east" />
        //     </div>
        //   </div>
        // </form>
        // ----------------------------
      ""
      }
    </div>
    
  );
};

export default OrderForm;
