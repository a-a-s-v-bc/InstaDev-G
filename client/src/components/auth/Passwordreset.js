import React, { Component } from "react";
//import axios from "axios";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

import { passwordresetUser } from "../../actions/authActions";

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
   this.props.passwordresetUser(User, this.props.history);
  }

   componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
        
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

Passwordreset.propTypes = {
  passwordresetUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  {
    errors: state.errors
  }
);
export default connect(mapStateToProps, {passwordresetUser})(Passwordreset);
