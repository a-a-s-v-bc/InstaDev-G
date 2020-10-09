import React, {Component} from 'react';
import {Provider} from 'react-redux';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Footer from './components/Layout/Footer';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/dashboard/Profile';
import EditProfile from './components/dashboard/EditProfile';
import store from './store';

import Login from './components/auth/Login';

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
          <Route exact path="/dashboard" component={Dashboard} />  
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/editProfile" component={EditProfile} />
          
          
    <Footer /> 
    </div>
    </Router>
    </Provider>

  );
};
}

export default App;
