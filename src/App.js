import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';
import Shop from './modules/shops/Shop';
import Notfound from './404';
import Cart from './modules/shops/cart/Cart';
import userAddress from './modules/shops/userInformation/userAddress';
import Newaddress from './modules/shops/userInformation/Newaddress';
import Shipping from './modules/shops/userInformation/Shipping';
import OderInformation from './modules/shops/order/OderInformation';
import OrderConfirm from './modules/shops/order/OrderConfirm';
import ProductDetail from './modules/shops/product/ProductDetail';
import OrderForm from './modules/shops/order/OrderForm';
import List from './modules/shops/List';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/shop" component={Shop} />
      </Switch>
      <Switch>
        <Route exact path="/not-found" component={Notfound} />
      </Switch>
      <Switch>
        <Route exact path= "/detail" component={ProductDetail} />
      </Switch>
      <Switch>
        <Route exact path= "/user-address" component={userAddress} />
      </Switch>
      <Switch>
        <Route exact path= "/news-address" component={Newaddress} />
      </Switch>
      <Switch>
        <Route exact path= "/select-shipping" component={Shipping} />
      </Switch>
      <Switch>
        <Route exact path= "/oderInformation" component={OderInformation} />
      </Switch>
      <Switch>
        <Route exact path= "/oderConfirm" component={OrderConfirm} />
      </Switch>
      <Switch>
        <Route exact path= "/cart" component={Cart} />
      </Switch>
      <Switch>
        <Route exact path= "/OderForm" component={OrderForm} />
      </Switch>
      <Switch>
        <Route exact path= "/List-item" component={List} />
      </Switch>
    </Router>
  );
}

export default App;
