import React, { Component } from 'react'

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
    <div className="dark-overlay landing-inner text-light">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 text-center">
            <h1 className="display-3 mb-4">InstaDev-G
            </h1>
            <p className="lead"> Passion. Code. Collaboration. </p>
            
  
                <a href="login.html" className="btn btn-lg btn-light">Login</a>
                <a href="register.html"  className="btn btn-lg btn-info mr-2">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  </div>

    )
  }
}
