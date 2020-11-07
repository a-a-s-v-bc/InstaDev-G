import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";



class EmailConfirm extends Component {
  render() {
    console.log("inside the email confirm js file", this.props);
    const userid = this.props.match.params.userid;
    return (
      <div className="container">
        <div className="row">
        <Link to="/login" className="btn" Style="margin-left:20px;width:400px;margin-bottom:50px;"
       
       onClick={() =>
         axios
           .post(`/api/users/setconfirmEmail/${userid}`)
           .then(res => console.log("success"))
         .catch(err => console.log(err))
       }
       
     >
         Confirm Email</Link>
        </div>
        </div>
    )
  }
}


const mapStateToProps = (state) => ({
  errors: state.errors,
  auth:state.auth
});
export default connect(mapStateToProps, {})(EmailConfirm);
