import React from 'react';
import Search from './Search';
import Icon from './../../../_components/_icon.component';

const Header = ({ totalCart, handleSubmit, showCart = '', title = '', hasNavigation = false
                  , doNavigation = '', showLeftNav, navId = '', headerBg = 'header-primary'}) => {

  const showShoppingCart = () => {
    if (showCart !== '') {
      return (
        <span onClick={e => {  showCart() }}>
          <img src="/images/shopping-cart.png" alt="menu_icon" />
          { totalCart > 0 ? <span className="total-cart"> {totalCart} </span> : '' }
        </span>
      )
    }
  }

  return (
    <div className={`flex-list flex-stretch shop-header ${headerBg}`}>
      <div className="header-home">
        {
          hasNavigation ? <span onClick={() => doNavigation(navId)} className="pointer"><img src="/images/Back-red.svg" alt="menu_icon" /></span>
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
