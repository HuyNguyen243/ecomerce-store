import React, { useState } from "react";
import CartItem from "./CartItem";
import Header from "./../header/Header";
import { LIST_CART_NAV } from "./../../../_config/shop.config";
import { useSelector } from "react-redux"; 
import { useDispatch } from "react-redux";
import { getUserCarts } from './../../../redux/actions/index';
import { useTranslation } from "react-i18next";
import NumberHelper from "./../../../_helpers/number";
import { useHistory } from "react-router";
import { deleteCartTrue } from "./../../../redux/actions/index";
import { getParentInformationDeviveryUser } from './../../../redux/actions/index';

const Cart = ({
  hideCart,
  totalCart
}) => {
  const history = useHistory()
  const carts = useSelector(state => state.carts);
  const dispatch = useDispatch();
  const [cartLoaded, setCartLoaded] = useState(false);
  const { t } = useTranslation();
  const totalCartPrice = useSelector(state => state.totalCartPrice);
  const oneDeliveryUser = useSelector(state => state.oneDeliveryUser);

  const showCart=()=>{
    if(carts?.length >0){
        return carts.map((item,key)=>{
            return(
                <CartItem index={key} key={key} item={item} />
            )
        })
    }else{
      return(
        <span className="error-messenger">{t("error.errorCart")}</span>
      )
    }
  }
  React.useEffect(()=>{
    if(!cartLoaded) {
      setCartLoaded(true)
      dispatch(getUserCarts())
    }
  },[dispatch, cartLoaded, setCartLoaded])

  const handleMoveHome = () =>{
    history.goBack()
    dispatch(deleteCartTrue(false))
  }

  const btnSubmit = () =>{
    history.push({ pathname: "/order-infomation" })
    if(oneDeliveryUser){
      dispatch(getParentInformationDeviveryUser(oneDeliveryUser))
    }
    
  }

  return (
    <div id={LIST_CART_NAV} className="nav-right">
      <Header
        doNavigation={hideCart}
        navId={LIST_CART_NAV}
        hasNavigation={true}
        title= {t("cart.titleCart")}
        totalCart={totalCart}
      />
      <div className="display-flex">
          <div className="main_container">
            <div className="news-style-cart style-for-cart stl-botom-cart list-cart">
              {showCart()}
              </div>
          </div>

          {
                  carts?.length > 0
                  && <div className="fix-bottom">
                      <div>
                      {/* <div className="divider"></div> */}
                        <div className="bottom">
                      </div>   
                      </div>
                           <div className="group-buttons center-icon">
                            <div className={`button-r button-right-block radius_btn`} onClick={handleMoveHome}>
                              {/* <p type="button" className="btn btn-red" > */}
                              <img src="/images/shopping-cart.png" alt="menu_icon" />
                              <span>{t("cart.AddCart")}</span>
                              {/* </p> */}
                            </div>
                          </div>
                    </div>
          }

          {
                  carts?.length > 0
                  && <div className="fix-bottom">
                      <div>
                      <div className="divider"></div>
                        <div className="bottom">
                          <div className="text-bold  new-text new-text2">{t("totalBottom.total")}</div>
                              <span className=" new-text new-text2">
                                   {   NumberHelper.formatCurrency(totalCartPrice)}
                              </span>
                      </div>   
                      </div>
                      <div className="btn-with-icon right-icon">
                        <button
                          className="btn btn-primary btn-payment"
                          onClick={btnSubmit}
                        >
                          {t("home.buttonBuy")}
                        </button>
                      </div>
                    </div>
                }
          </div>
    </div>
  );
};

export default Cart;
