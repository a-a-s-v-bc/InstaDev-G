import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
  constructor() {
    super();
    //Local State of Register Component
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }
    onChange(e) {
      this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e) {
      e.preventDefault();
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };
    axios.post('/api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}));
    }

  render() {
    const {errors} = this.state;

    return (
      <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <h3 className="lead text-center">Create your account</h3>
          <form onSubmit={this.onSubmit}>
          <div className="form-group">
        <input type="text" className={classnames("form-control form-control-lg", {"is-invalid":errors.name})} placeholder="Name" name="name" 
              value={this.state.name}
              onChange={this.onChange}/>
            
            {errors.name && (
              <div className="invalid-feedback"> {errors.name} 
              </div>
            )
            }

            </div>
            <div className="form-group">
              <input type="email" className={classnames("form-control form-control-lg", {"is-invalid":errors.email})}  placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
            
            {errors.email && (
              <div className="invalid-feedback"> {errors.email} 
              </div>
            )
            }
              <small className="form-text text-muted" > Use your Gravatar email address to link a personal online avatar.  Don't have one?  Create yours <a href="https://www.en.gravatar.com"><u> here</u></a>. </small>
            </div>
            <div className="form-group">
              <input type="password" className={classnames("form-control form-control-lg", {"is-invalid":errors.password})}  placeholder="Password" name="password" value={this.state.password}
              onChange={this.onChange} />

            {errors.password && (
              <div className="invalid-feedback"> {errors.password} 
              </div>
            )
            }

            </div>
            <div className="form-group">
              <input type="password" className={classnames("form-control form-control-lg", {"is-invalid":errors.password2})}  placeholder="Confirm Password" name="password2" value={this.state.password2}
              onChange={this.onChange} />
         
            {errors.password2 && (
              <div className="invalid-feedback"> {errors.password2} 
              </div>
            )
            }

            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}
export default Register;