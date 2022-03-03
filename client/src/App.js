import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login';
import Homepage from './components/Homepage/Homepage';
import NotFound from './components/404/NotFound';
import Profile from './components/Profile/Profile';

import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import Search from './components/Search/Search';

const App = () => {

  return (
    // hays
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <PrivateRoute exact path="/" component={Homepage}/>
          <PrivateRoute exact path="/profile/:id" component={Profile}/>
          <PrivateRoute exact path="/search" component={Search}/>
          <Route exact path="*" component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
