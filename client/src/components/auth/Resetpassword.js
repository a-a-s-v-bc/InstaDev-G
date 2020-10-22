import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

//import PropTypes from "prop-types";
//import { connect } from "react-redux";
//import {resetpasswordUser} from "../../actions/authActions";
class Resetpassword extends Component {
  constructor() {
    super();
    //Local State of Reset password component
    this.state = {
      email: "",

      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const User = {
      email: this.state.email,
    };
    axios
      .post("/api/users/resetpassword", User)
      .then((res) => console.log(res.data))
      .catch((err) => this.setState({ errors: err.response.data }));
    window.location.href='/emailsenttext';
  }

  
  render() {
    const { errors } = this.state;

    return (
      <div className="resetpassword">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1
                className="display-3 text-center"
                Style="font-weight:Bold;margin-bottom:30px;">
                Reset password
              </h1>
              <h3 className="text-left">Enter your email </h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback"> {errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-info btn-block"
                    Style="float:left;margin-bottom:300px;"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Resetpassword;
