import React from 'react';
import Search from './Search';
import{Link}from 'react-router-dom'
import { useHistory } from "react-router";
import { useSelector } from "react-redux";


const Header = ({ handleSubmit, showCart = '', title = '', hasNavigation
                  , doNavigation = '', showLeftNav, headerBg = 'header-primary'}) => {
          
  const usehistory =useHistory()
  const carts = useSelector(state => state.carts);
  const showShoppingCart = () => {
      if (showCart !== '') {
        let totalContainer = 0
        if(carts?.length > 0){
          for(let i = 0;i < carts?.length ; i++){
            totalContainer +=carts[i].quantity
          }
        }
        return (
          <Link to="/cart">
            <span onClick={e => {  showCart() }}>
              <img src="/images/shopping-cart.png" alt="menu_icon" />
              { carts?.length > 0 ? <span className={`total-cart + ${totalContainer > 99 ? "fix-total-cart" : ""}`}> {totalContainer} </span> : '' }
            </span>
          </Link>
        )
    }
  }
  const handleGoBack = () => {
    if(doNavigation !== '') {
      doNavigation()
    }else {
      usehistory.goBack()
    }
  }

  return (
    <div className={`flex-list flex-stretch shop-header ${headerBg}`}>
      <div className="header-home">
        {
          hasNavigation ? <span onClick={() => handleGoBack() } className="pointer"><img src="/images/Back-red.svg" alt="menu_icon" /></span>
                        : <span onClick={() => showLeftNav()} className="pointer fix_icon"><img src="/images/menu-red.svg" alt="menu_icon" /></span>
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
