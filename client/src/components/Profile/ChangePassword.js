import React, { Component } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {changeProfilePassword} from '../../actions/profileActions';

class ChangePassword extends Component {
  constructor() {
    super();
    //Local State of Change Password Component
    this.state = {
      password: "",
      password2: "",
      message:"",
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
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.changeProfilePassword(User);
  

    
  }

  render() {
    const { errors } = this.props;
    console.log("props:", this.props);
 
  
      if (this.props.auth.actions.Msg) {
        return(<div class="alert alert-success" role="alert">{this.props.auth.actions.Msg}
        </div>)
      
      }
    
    
    return (
      <div className="changepassword">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1
                className="display-3 text-center"
                Style="font-weight:Bold;margin-bottom:30px;"
              >
                Change User Password
              </h1>

              <form onSubmit={this.onSubmit}>
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

ChangePassword.propTypes = {
  changeProfilePassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  mesg: state.actions,
});

export default connect(mapStateToProps, { changeProfilePassword })(ChangePassword);