import React, {Component} from 'react';
import {Provider} from 'react-redux';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Footer from './components/Layout/Footer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from './components/auth/Register';
import Dashboard from "./components/dashboard/Dashboard";
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import store from './store';
import Login from './components/auth/Login';
import Followers from './components/Profile/Followers';
import Following from './components/Profile/Following';
import Resetpassword from './components/auth/Resetpassword';
import Passwordreset from './components/auth/Passwordreset';
import EmailSentText from "./components/auth/EmailSentText";
import jwt_decode from 'jwt-decode';
import { logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import {SET_USER } from './actions/types';
import ChangePassword from './components/Profile/ChangePassword';
import CreateProfile from './components/Profile/CreateProfile';
import AllProfiles from './components/Profile/AllProfiles';
import OthersProfile from './components/Profile/OthersProfile';
import PrivateRoute from "./components/common/PrivateRoute";

import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";


if (localStorage.jwtToken){

  //decode token 
  const decoded=jwt_decode(localStorage.jwtToken);

  //check the expiry of the token
  const currentTime=Date.now()/1000;
  if(decoded.exp<currentTime){
    //expired by now
    //logout user
    store.dispatch(logoutUser());
    //redirect user to login
    window.location.href='/login';
  }
  //Set auth header

  setAuthToken(localStorage.jwtToken);

  // dispatch

 store.dispatch({

    type:SET_USER,
    payload:decoded
  });

}


class App extends Component {


  render() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/resetpassword" component={Resetpassword} />
          <Route exact path="/forgotpassword/:token" component={Passwordreset} />
          <Route exact path="/emailsenttext" component={EmailSentText} />
          <Switch>
          <PrivateRoute exact path="/Dashboard" component={Dashboard} />
          </Switch>
          
<Switch>   <PrivateRoute exact path="/profile" component={Profile} /></Switch>
       
          <Switch>
          <PrivateRoute exact path="/profile/editProfile" component={EditProfile} />
          </Switch> 
          <Switch>
          <PrivateRoute exact path="/profile/followers" component={Followers} />
          </Switch>
          <Switch><PrivateRoute exact path="/profile/following" component={Following} /></Switch>
          <Switch> <PrivateRoute
            exact
            path="/profile/changePassword"
            component={ChangePassword}
          /></Switch>
         <Switch><PrivateRoute
            exact
            path="/profile/createProfile"
            component={CreateProfile}
          /></Switch>
          
          <Switch>
          <PrivateRoute exact path="/feed" component={Posts} />
</Switch>
          <Switch> <PrivateRoute exact path="/post/:id" component={Post} /></Switch>
         
          <Switch><PrivateRoute exact path="/profile/followers/:user_id" component={Followers} /></Switch>
          <Switch><PrivateRoute exact path="/profile/following/:user_id" component={Following} /></Switch>
          
         
          <Switch><PrivateRoute exact path="/search/profiles" component={AllProfiles} /></Switch>
          <Switch><PrivateRoute exact path="/profile/other" component={OthersProfile} /></Switch>
          

          <Footer />
        </div>
      </Router>
    </Provider>
  );
};
}

export default App;
