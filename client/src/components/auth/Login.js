import React, { Component } from 'react';
import classnames from "classnames";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {loginUser} from '../../actions/authActions';


 class Login extends Component {
   constructor() {
     super();
     //Local State of Register Component
     this.state = {
       email: "",
       password: "",
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
     const user = {
       email: this.state.email,
       password: this.state.password,
     };

     this.props.loginUser(user);
   }

   componentWillReceiveProps(nextProps) {

    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');

    }
     if (nextProps.errors) {
       this.setState({ errors: nextProps.errors });
     }
   }

   render() {
     const { errors } = this.state;

     return (
       <div className="login">
         <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
               <h1
                 className="display-3 text-center"
                 Style="font-weight:Bold;margin-bottom:30px;"
               >
                 Log In
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
                 <Link to="/resetpassword" Style="margin-right:-35px">
                   Forgot Password?
                 </Link>

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

 Login.propTypes = {
   LoginUser: PropTypes.func.isRequired,
   errors: PropTypes.object.isRequired,
   auth:PropTypes.object.isRequired
 };

 const mapStateToProps = (state) => ({
   errors: state.errors,
   auth:state.auth
 });

export default connect(mapStateToProps, { loginUser })(Login);