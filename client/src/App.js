import React from 'react';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Footer from './components/Layout/Footer';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Register from './components/auth/Register';

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar />
     <Route exact path="/" component={Landing} />
     <Route exact path="/register" component={Register} />
    <Footer />
    </div>
    </Router>
  );
}

export default App;
