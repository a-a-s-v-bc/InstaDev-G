import React, {Component} from 'react';
import {Provider} from 'react-redux';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Footer from './components/Layout/Footer';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Register from './components/auth/Register';
import Dashboard from "./components/dashboard/Dashboard";
import Profile from './components/dashboard/Profile';
import EditProfile from './components/dashboard/EditProfile';
import store from './store';
import Login from './components/auth/Login';
import Followers from './components/dashboard/Followers';
import Following from './components/dashboard/Following';
import Resetpassword from './components/auth/Resetpassword';
import Passwordreset from './components/auth/Passwordreset';
import jwt_decode from 'jwt-decode';
import { logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import {SET_USER } from './actions/types';
import ChangePassword from './components/dashboard/ChangePassword';

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
          <Route
            exact path="/forgotpassword/:token" component={Passwordreset}  />
         
            <Route exact path="/Dashboard" component={Dashboard} />
         
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/editProfile" component={EditProfile} />
          <Route exact path="/profile/followers" component={Followers} />
          <Route exact path="/profile/following" component={Following} />
          <Route
            exact
            path="/profile/changePassword"
            component={ChangePassword}
          />

          <Footer />
        </div>
      </Router>
    </Provider>
  );
};
}

export default App;
