import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Navbar from './Navbar';
import routes from './routes'

export default () => (
  <div>
    <Navbar />
    <Switch>
      {routes.map(({ path, exact, component: C, ...rest }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          render={(props) => (
            <C {...props} {...rest} />
          )}
        />
      ))}
      <Route render={(props) => <NoMatch {...props} />} />
    </Switch>
  </div>
);
