import React from 'react';
import Search from './Search';
import ChangeLanguage from './ChangeLanguage';
import{Link}from 'react-router-dom'
import { useHistory } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import { useLocation } from 'react-router';
import { getIdBtnTabs } from "./../../../redux/actions/index";
import { deleteCartTrue } from "./../../../redux/actions/index";

const Header = ({ handleSubmit, showCart = '', title = '', hasNavigation
                  , doNavigation = '', showLeftNav, headerBg = 'header-primary'}) => {
  const usehistory =useHistory()
  const carts = useSelector(state => state.carts);
  const generalData = useSelector(state => state.generalData);
  const deleteoderproduct = useSelector(state=>state.deleteoderproduct)
  const location = useLocation()
  const dispatch = useDispatch()
  React.useEffect(()=>{
    if(location.pathname === "/" ){
      dispatch(getIdBtnTabs(""))
    }
  })
  
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
              <img src="/images/shopping-cart.svg" alt="menu_icon" />
              { carts?.length > 0 ? <span className={`total-cart + ${totalContainer > 99 ? "fix-total-cart" : ""}`}> {totalContainer} </span> : '' }
            </span>
          </Link>
        )
    }
  }

  const handleGoBack = () => {
    deleteoderproduct.isLoaded = false
    if(doNavigation !== '') {
      doNavigation()
    }else {
      if(!generalData.isLoaded) {
        usehistory.push('/')
      }else {
        usehistory.goBack()
        dispatch(deleteCartTrue(false))
      }
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
        <div className="header-cart" >
          { showShoppingCart() }
        </div>
        <div className="language">
        <ChangeLanguage />
        </div>
    </div>
  );
}

export default Header;
