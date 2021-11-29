import React from 'react';
import Search from './Search';
import Icon from './../../../_components/_icon.component';

const Header = ({ totalCart, handleSubmit, showCart = '', title = '', hasNavigation = false
                  , doNavigation = '', showLeftNav, navId = '', headerBg = 'header-primary'}) => {

  const showShoppingCart = () => {
    if (showCart !== '') {
      return (
        <span onClick={e => {  showCart() }}>
          <Icon name="shopping_cart" styled="outlined" />
          { totalCart > 0 ? <span className="total-cart"> {totalCart} </span> : '' }
        </span>
      )
    }
  }

  return (
    <div className={`flex-list flex-stretch shop-header ${headerBg}`}>
      <div className="header-home">
        {
          hasNavigation ? <span onClick={() => doNavigation(navId)} className="pointer"><Icon name="keyboard_backspace" /></span>
                        : <span onClick={() => showLeftNav()} className="pointer"><img src="/images/menu.svg" alt="menu_icon" /></span>
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
