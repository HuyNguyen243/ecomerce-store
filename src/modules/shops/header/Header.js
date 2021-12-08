import React from 'react';
import Search from './Search';
import Icon from './../../../_components/_icon.component';
import{Link}from 'react-router-dom'
import { useHistory,useLocation,} from "react-router";

const Header = ({ totalCart, handleSubmit, showCart = '', title = '', hasNavigation = false
                  , doNavigation = '', showLeftNav, navId = '', headerBg = 'header-primary'}) => {
  const showShoppingCart = () => {
    if (showCart !== '') {
      return (
        <Link to="/cart">
          <span onClick={e => {  showCart() }}>
            <img src="/images/shopping-cart.png" alt="menu_icon" />
            { totalCart > 0 ? <span className="total-cart"> {totalCart} </span> : '' }
          </span>
        </Link>
      )
    }
  }
  const usehistory =useHistory()
  const uselocation = useLocation()
  const handleBack =()=>{
    if(uselocation.pathname == "/cart" || uselocation.pathname == "/List-item" || uselocation.pathname == "/order-product"){
      usehistory.push("/shop"+"?botId=6149b1a9c941488634c963cf&userId=4954465131233429")
    }
    if(uselocation.pathname == "/OderForm"){
      usehistory.push("cart")
    }
    if(uselocation.pathname == "/oderInformation" || uselocation.pathname == "/user-address" || uselocation.pathname == "/select-shipping"){
      usehistory.push("/OderForm")
    }
    if(uselocation.pathname == "/oderConfirm"){
      usehistory.push("/oderInformation")
    }
    if(uselocation.pathname == "/news-address"){
      usehistory.push("/user-address")
    }
  }
  return (
    <div className={`flex-list flex-stretch shop-header ${headerBg}`}>
      <div className="header-home">
        {
          hasNavigation ? <span onClick={handleBack} className="pointer"><img src="/images/Back-red.svg" alt="menu_icon" /></span>
                        : <span onClick={() => showLeftNav()} className="pointer"><img src="/images/menu-red.svg" alt="menu_icon" /></span>
        }
      </div>
      <div className="header-search">
        {
          title !== '' ?  title  : <Search handleSubmit={handleSubmit} />
        }
      </div>
      <div className="header-cart">
        { showShoppingCart() }
      </div>
    </div>
  );
}

export default Header;
