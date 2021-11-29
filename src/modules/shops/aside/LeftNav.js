import React, {useState} from "react";
import { USER_ORDER_NAV, PROFILE_NAV, LEFT_MENU_NAV } from './../../../_config/shop.config';
// import Icon from './../../../_components/_icon.component';

const LeftNav = ({ menu, getListData, showNavigation, showLeftNav }) => {
  let menuList;
  const [isToggled, setIsToggled] = useState(false);

  const getByCategory = (id, listTitle) => {
    let params = `?categoryId=${id}`;
    getListData(params, listTitle)
  }
  if (menu.length > 0) {
    menuList = menu.map((item, index) => {
      if (item.products.length > 0) {
        return <li key={index}><span onClick={e => getByCategory(item._id, item.name)}>{item.name}</span></li>;
      }
      return '';
    })
    ;
  }

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
        <div className="menu-left-item" onClick={e => showNavigation(PROFILE_NAV)}>
          <img src='/images/user_icon.svg' alt="user"/>
          <span>Thông tin cá nhân</span>
        </div>
        <div className="menu-left-item" onClick={e => toggleCategory()}>
          <img src='/images/category_icon.svg' alt="category"/>
          <span>Danh mục</span>
        </div>
        <div className="menu-left-item" onClick={e => showNavigation(USER_ORDER_NAV)}>
          <img src='/images/user_orders_icon.svg' alt="order"/>
          <span>Đơn hàng của bạn</span>
        </div>
      </div>
      <ul className={`menu-category ${ isToggled ? '' : 'hide'}`} >
        {menuList}
      </ul>
      <div onClick={e => hideLeftNav()} className="empty-space"></div>
    </div>
  );
};
export default LeftNav;
