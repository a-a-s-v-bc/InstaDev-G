import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import MediaQuery from 'react-responsive';
//import { useMediaQuery } from 'react-responsive'

class Landing extends Component {
  render() {
    
    return (
      
      <div className="landing">
        
    <div className="dark-overlay landing-inner text-light">
      <div className="container">
            <div className="row">
           
          <div className="col-xl-12 text-center">
            <h1 className="display-3 mb-4" Style="text-align:right;margin-top:100px;font-size:4em;">InstaDev-G
            <p className="lead"> Passion. Code. Collaboration. </p></h1>
            
            <Link to="/login" className="btn btn-lg btn-light" Style="margin-right:-35px">Login</Link>
            <Link to="/register"  className="btn btn-lg btn-info mr-2" Style="margin-right:-35px;">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  </div>

    )
  }
}
export default Landing;