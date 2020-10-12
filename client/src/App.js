import React, {Component} from 'react';
import {Provider} from 'react-redux';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Footer from './components/Layout/Footer';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Register from './components/auth/Register';

import Profile from './components/dashboard/Profile';
import EditProfile from './components/dashboard/EditProfile';
import store from './store';

import Login from './components/auth/Login';
import Followers from './components/dashboard/Followers';
import Following from './components/dashboard/Following';
import Resetpassword from './components/auth/Resetpassword';
import Passwordreset from './components/auth/Passwordreset';

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
          
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/editProfile" component={EditProfile} />
          <Route exact path="/profile/followers" component={Followers} />
          <Route exact path="/profile/following" component={Following} />

          <Footer />
        </div>
      </Router>
    </Provider>
  );
};
}

export default App;
