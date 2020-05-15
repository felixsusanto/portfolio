import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Main from "./pages/Main";
import Intro from "./pages/Intro";

const RoutesPath = [
  {
    path: '/',
    exact: true,
    component: Main 
  }, 
  {
    path: '/hello/:company',
    exact: false,
    component: Intro
  }
];

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        {RoutesPath.map((o) => {
          return <Route {...o} key={o.path} />
        })}
      </Switch>
    </Router>
  );
};

export default Routes;