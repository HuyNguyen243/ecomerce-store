import React from "react";
import{Link} from "react-router-dom"
import Header from "./../header/Header";
import { LIST_CART_NAV } from "./../../../_config/shop.config";
import { useHistory } from "react-router";
import TotalBottom from "./TotalBottom";

const OrderForm = ({ onSubmit, isLoading,
  hideCart,
  totalCart
}) => {

  const history = useHistory()
  const handleBack=()=>{
    history.goBack()
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
        <form className="basic-form" >
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
            <div className="shipping height">
              <span>Phương thức vận chuyển (Giao hàng tiết kiệm)</span>
              <img src="/images/Back-Black.svg" alt="menu_icon" />
            </div>
            </Link>
          </div>
        
        </form>
      </div>
      <div className="fix-bottom">
            <div>
            <div>
            <div className="divider"></div>
              <TotalBottom />
            </div>
            
            <div className="btn-with-icon right-icon">
              <button type="submit" className="btn btn-primary btn-left-icon " onClick={handleBack}>Quay lại</button>
              <Link to="/oderInformation"><button type="submit" className="btn btn-primary btn-right-icon ">Tiếp tục</button></Link>
              {/* <button type="submit" className="btn btn-primary btn-right-icon">Tiếp tục</button> */}
            </div>
              
            </div>
      </div>
    </div>
    
  );
};

export default OrderForm;
