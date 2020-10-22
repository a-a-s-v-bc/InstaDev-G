import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class Passwordreset extends Component {
  constructor() {
    super();
    //Local State of Password reset Component
    this.state = {
      email: "",
      password: "",
      password2:"",
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
      password: this.state.password,
      password2: this.state.password2,
    };
    axios
      .post("/api/users/forgotpassword/:token", User)
      .then((res) => console.log(res.data))
      .catch((err) => this.setState({ errors: err.response.data }));
      alert("Success!! Your new password is updated. Kindly Login.");
      window.location.href = "/login";
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="forgotpassword">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1
                className="display-3 text-center"
                Style="font-weight:Bold;margin-bottom:30px;" >
                New Password Reset
              </h1>

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
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback"> {errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2,
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback"> {errors.password2}</div>
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

export default Passwordreset;
