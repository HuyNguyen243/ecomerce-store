import React from "react";
import { useForm } from "react-hook-form";
import Loader from "./../../../_components/_loader.component";
import Icon from './../../../_components/_icon.component';

const OrderForm = ({ onSubmit, user, isLoading }) => {
  const { register, handleSubmit, errors } = useForm();
  let emptyErrorTxt = 'Vui lòng điền thông tin';
  let phoneErrorTxt = 'Số điện thoại không hợp lệ';

  return (
    <div>
      {isLoading 
        ? 
            <Loader /> 
        :
        <form className="basic-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              name="customerName"
              className="app-input"
              placeholder="Tên người nhận"
              ref={register({ required: true })}
              defaultValue={user.username}
            />
            {errors.customerName && (
              <span className="txt-danger">{emptyErrorTxt}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="number"
              name="customerPhone"
              className="app-input"
              placeholder="Số điện thoại"
              ref={register({
                required: true,
                pattern: /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
              })}
              defaultValue={user.phone}
            />
            {errors.customerPhone && errors.customerPhone.type === "required" && (
              <span className="txt-danger">{emptyErrorTxt}</span>
            )}
            {errors.customerPhone && errors.customerPhone.type === "pattern" && (
              <span className="txt-danger">{phoneErrorTxt}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="customerAddress"
              className="app-input"
              placeholder="Địa chỉ"
              ref={register({ required: true })}
              defaultValue={user.address}
            />
            {errors.customerAddress && (
              <span className="txt-danger">{emptyErrorTxt}</span>
            )}
          </div>
          <div className="form-group">
            <textarea name="note" className="app-input" placeholder="Ghi chú" ref={register} />
          </div>
          <div className="fix-bottom">
            <div className="btn-with-icon right-icon">
              <button type="submit" className="btn btn-primary">Tiếp tục</button>
              <Icon name="east" />
            </div>
          </div>
          
        </form>
      }
    </div>
    
  );
};

export default OrderForm;
