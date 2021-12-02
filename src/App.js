import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';
import Shop from './modules/shops/Shop';
import Notfound from './404';
import Cart from './modules/shops/cart/Cart';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/shop" component={Shop} />
      </Switch>
      <Switch>
        <Route exact path="/not-found" component={Notfound} />
      </Switch>
    </Router>
  );
}

export default App;
