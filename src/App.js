import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { routes } from './routes';
import './App.scss';


function App() {

  const routeRenderer = (index, route) => {
    return (
      <Route
          key={index}
          path={route.path}
          exact={route.exact}
          children={<route.main />}
      />
    )
  }

  return (
    <Router>
      <Switch>
      {routes.map((route, index) => (
        routeRenderer(index, route)
      ))}
      </Switch>
    </Router>
  );
}

export default App;
