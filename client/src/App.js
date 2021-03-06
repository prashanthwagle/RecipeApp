import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from './store';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CreateRecipe from './components/dashboard/CreateRecipe'
import RecipeDetail from './components/dashboard/RecipeDetail'
import NotFound from "./components/layout/NotFound";

  // Check for token to keep user logged in
  if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}


class App extends Component {
  render() {
    return (
      //Provider to make Redux store available to any nested component
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/dashboard/create" component={CreateRecipe}/>
              <PrivateRoute path = "/dashboard/mine" component = {Dashboard}/>
              <PrivateRoute exact path = "/dashboard/:id" component = {RecipeDetail}/>
              <PrivateRoute exact path = "/dashboard/:id/update" component = {CreateRecipe}/>
              <Route component = {NotFound}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;