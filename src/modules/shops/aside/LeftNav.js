import React, {useState} from "react";
import { USER_ORDER_NAV, LEFT_MENU_NAV } from './../../../_config/shop.config';
// import Icon from './../../../_components/_icon.component';
import{Link} from "react-router-dom"
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkGetDelivetyUser } from "../../../redux/actions";
import { useTranslation } from "react-i18next";

const LeftNav = ({ menu, getListData, showNavigation, showLeftNav }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [isToggled, setIsToggled] = useState(false);
  const history = useHistory()

  const toggleCategory = () => {
    let state = !isToggled;
    setIsToggled(state);
    history.push("/user-address")
    dispatch(checkGetDelivetyUser(false))
  }

  const hideLeftNav = () => {
    showLeftNav()
    setIsToggled(false);
  }

  const moveToPreferential = () =>{
    history.push("/preferential")
  }

  return (
    <div id={LEFT_MENU_NAV} className="overlay nav-left">
      <div className="menu-left-nav">

          <div className="menu-left-item" onClick={e => toggleCategory()}>
            <img src='/images/information.svg' alt="category"/>
            <span>{t("leftNav.inforUserAddress")}</span>
          </div>

        <Link to="/orders">
          <div className="menu-left-item" onClick={e => showNavigation(USER_ORDER_NAV)}>
            <img src='/images/Shopping_list.svg' alt="order"/>
            <span>{t("leftNav.oderList")}</span>
          </div>
        </Link>

          <div className="menu-left-item" onClick={e => moveToPreferential()}>
            <img src='/images/sale.png' alt="category"/>
            <span style={{color: "#f40000"}}>{t("leftNav.Preferential")}</span>
          </div>

      </div>
      <div onClick={e => hideLeftNav()} className="empty-space"></div>
    </div>
  );
};
export default LeftNav;
