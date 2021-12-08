import React, {useState} from "react";
import { USER_ORDER_NAV, LEFT_MENU_NAV } from './../../../_config/shop.config';
// import Icon from './../../../_components/_icon.component';
import{Link} from "react-router-dom"

const LeftNav = ({ menu, getListData, showNavigation, showLeftNav }) => {

  const [isToggled, setIsToggled] = useState(false);

  const toggleCategory = () => {
    let state = !isToggled;
    setIsToggled(state);
  }

  const hideLeftNav = () => {
    showLeftNav()
    setIsToggled(false);
  }

  return (
    <div id={LEFT_MENU_NAV} className="overlay nav-left">
      <div className="menu-left-nav">
        <div className="menu-left-item" onClick={e => toggleCategory()}>
          <img src='/images/information.svg' alt="category"/>
          <span>THÔNG TIN ĐẶT HÀNG</span>
        </div>
        <Link to="/order-product">
        <div className="menu-left-item" onClick={e => showNavigation(USER_ORDER_NAV)}>
          <img src='/images/Shopping_list.svg' alt="order"/>
          <span>DANH SÁCH ĐƠN HÀNG</span>
        </div>
        </Link>
      </div>
      <div onClick={e => hideLeftNav()} className="empty-space"></div>
    </div>
  );
};
export default LeftNav;
