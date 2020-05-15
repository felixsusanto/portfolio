import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from 'pages/Main';
import Intro from 'pages/Intro';

const RoutesPath = [
  {
    path: '/',
    exact: true,
    component: Main
  },
  {
    path: '/hello/:company',
    exact: true,
    component: Intro
  }
];

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        {RoutesPath.map((o, i) => {
          return (
            <Route
              key={i}
              component={o.component}
              path={o.path}
              exact={o.exact}
            />
          );
        })}
      </Switch>
    </Router>
  );
};

export default Routes;
