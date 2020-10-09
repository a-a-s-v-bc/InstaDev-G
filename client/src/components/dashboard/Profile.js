import React, { Component } from 'react'

export default class Profile extends Component {
  render() {
    return (
      <div className="container" id='profilecover'>
            <div className="profileheader">
              <div className="card card-body text-white mb-3 ">
                <div className="row">
                
                <img className="rounded-circle positionimage" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="" />
                <div className="btn-group mb-4" role="group">
            <a href="/profile/editProfile" className="btn btn-light">
              <i className="fas fa-user-circle  mr-1"></i> Edit Profile</a>
            <a href="add-experience.html" className="btn btn-light">
              <i className="fas fa-mail-bulk  mr-1"></i>
              Posts</a>
            <a href="/profile/followers" className="btn btn-light">
              <i className="fas fa-arrow-circle-right  mr-1"></i>
              Followers</a>
              <a href="/profile/following" className="btn btn-light">
              <i className="fas fa-arrow-circle-left  mr-1"></i>
              Following</a>
          </div>

            
            </div>
            <div className="text-left">
              <h1 className="display-4 text-left" Style="margin-left:50px;">John Doe</h1>
              </div>
                
                  
                  
                  <p className="socialicons">
                   
              
                    <a className="text-white p-2" href="www.twitter.com">
                      <i className="fab fa-twitter fa-2x"></i>
                    </a>
                    <a className="text-white p-2" href="www.facebook.com">
                      <i className="fab fa-facebook fa-2x"></i>
                    </a>
                    <a className="text-white p-2" href="www.linkedin.com">
                      <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                    <a className="text-white p-2" href="www.youtube.com">
                      <i className="fab fa-youtube fa-2x"></i>
                    </a>
                  </p>
              
              </div>
            </div>
          </div>
    )
  }
}




