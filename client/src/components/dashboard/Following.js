import React, { Component } from 'react'

export default class Following extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>All Following <a href="/profile" className="btn btn-light" Style="margin-left:720px;margin-top:0px;">
                Go Back
              </a></h2>
         
          <br></br>
          <br></br>
          <br></br>

          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa fa-search"></i>
              </div>
            </div>
            <input
              className="form-control py-3  border"
              type="search"
              placeholder="Search"
              Style="font-size:1.25em;"
            />
          </div>

          <br></br>
          <br></br>
          <br></br>
          <div className="col-md-12">
            <img
              className="rounded-circle"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              alt=""
            />
            <span className="followername">John Doe</span>
            <input
              type="submit"
              value="Unfollow"
              className="btn btn-info followersremove"
            />
          </div>
        </div>
      </div>

    )
  }
}
