import React, { Component } from 'react'

export default class Profile extends Component {
  render() {
    return (
      <div className="container" id='profilecover'>
            <div className="profileheader">
              <div className="card card-body text-white mb-3 ">
                <div className="row">
                
                <img className="rounded-circle positionimage" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="" />
                <div class="btn-group mb-4" role="group">
            <a href="/profile/editProfile" class="btn btn-light">
              <i class="fas fa-user-circle  mr-1"></i> Edit Profile</a>
            <a href="add-experience.html" class="btn btn-light">
              <i class="fas fa-mail-bulk  mr-1"></i>
              Posts</a>
            <a href="add-education.html" class="btn btn-light">
              <i class="fas fa-arrow-circle-right  mr-1"></i>
              Followers</a>
              <a href="add-education.html" class="btn btn-light">
              <i class="fas fa-arrow-circle-left  mr-1"></i>
              Following</a>
          </div>

            
            </div>
            <div className="text-left">
              <h1 className="display-4 text-left" Style="margin-left:50px;">John Doe</h1>
              </div>
                
                  
                  
                  <p className="socialicons">
                   
              
                    <a className="text-white p-2" href="#">
                      <i className="fab fa-twitter fa-2x"></i>
                    </a>
                    <a className="text-white p-2" href="#">
                      <i className="fab fa-facebook fa-2x"></i>
                    </a>
                    <a className="text-white p-2" href="#">
                      <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                    <a className="text-white p-2" href="#">
                      <i className="fab fa-youtube fa-2x"></i>
                    </a>
                  </p>
              
              </div>
            </div>
          </div>
    )
  }
}




