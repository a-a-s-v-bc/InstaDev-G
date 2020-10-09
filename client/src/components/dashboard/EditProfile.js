import React, { Component } from "react";

export default class EditProfile extends Component {
  render() {
    return (
      <div class="create-profile">
          <a href="/profile" class="btn btn-light">
          Change Password
              </a>
              <a href="/profile" class="btn btn-light">
                Go Back
              </a>
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              
              
              <h1 class="display-4 text-center" Style="font-weight:bold; margin-top:10px;">Edit Your Profile</h1>

              <small class="d-block pb-3">* = required field</small>
              <div class="form-group">
                <img
                  className="rounded-circle Editimage"
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                  alt=""
                />
                <a href="/profile" class="form-text Profilechangeimage">Change Profile Image</a>
              
              </div>
             
              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-md"
                  placeholder="Location"
                  name="location"
                  value="Name"
                />
                <small class="form-text ">Name</small>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-md"
                  placeholder="* Profile handle"
                  name="handle"
                  value="myprofilehandle"
                  required
                />
                <small class="form-text">
                  A unique handle for your profile URL. Your full name, company
                  name, nickname, etc (This CAN'T be changed later)
                </small>
              </div>
              <div class="form-group">
                <select class="form-control form-control-md" name="status">
                  <option value="0">* Select Professional Status</option>
                  <option value="Developer">Developer</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Senior Developer" selected>
                    Senior Developer
                  </option>
                  <option value="Manager">Manager</option>
                  <option value="Student or Learning">
                    Student or Learning
                  </option>
                  <option value="Instructor">Instructor or Teacher</option>
                  <option value="Intern">Intern</option>
                  <option value="Other">Other</option>
                </select>
                <small class="form-text">
                  Give us an idea of where you are at in your career
                </small>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-md"
                  placeholder="Location"
                  name="location"
                  value="abc@xyz.com"
                />
                <small class="form-text">Email Address</small>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-md"
                  placeholder="Location"
                  name="location"
                  value="+1 4123124324"
                />
                <small class="form-text">Phone Number</small>
              </div>

              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-md"
                  placeholder="Location"
                  name="location"
                  value="www.abc.com"
                />
                <small class="form-text">Website</small>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-md"
                  placeholder="Location"
                  name="location"
                  value="Bio"
                />
                <small class="form-text">Bio</small>
              </div>
              <div class="form-group">
                <textarea
                  class="form-control form-control-md"
                  placeholder="A short bio of yourself"
                  name="bio"
                >
                  I am a web developer from Florida with around 8 years
                  experience
                </textarea>
                <small class="form-text">
                  Tell us a little about yourself
                </small>
              </div>

              <div class="op">
               
                <span class="text-muted">Optional</span>
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fab fa-twitter"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control form-control-md"
                  placeholder="Twitter Profile URL"
                  name="twitter"
                  value="https://www.twitter.com/johndoe"
                />
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fab fa-facebook"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control form-control-md"
                  placeholder="Facebook Page URL"
                  name="facebook"
                />
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fab fa-linkedin"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control form-control-md"
                  placeholder="Linkedin Profile URL"
                  name="linkedin"
                />
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fab fa-youtube"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control form-control-md"
                  placeholder="YouTube Channel URL"
                  name="youtube"
                />
              </div>
              <div class="input-group mb-3"> <input type="submit" class="btn btn-info btn-block mt-4" Style="margin-bottom:20px;margin-right:0px;"/></div>
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}
