import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from '../../actions/profileActions';
import isEmpty from "../../validation/is-empty";

class Profile extends Component {

 

  componentDidMount() {
    this.props.getCurrentProfile();
  }
   
  render() {
    console.log("props", this.props);
    if(this.props.profile.loaded === false) {
      return (
        <div> Loading .....</div>
      )
    }

    if (this.props.profile.noprofile) {
      return (
        <div className="container" Style="margin-bottom:600px;margin-top:15px;">
        <div className="btn-group mb-4"  role="group">
          <a href="/profile/createProfile" className="btn btn-light">
            <i className="fas fa-user-circle  mr-1"></i> Create Profile</a>
          </div>
          </div>
      )
    }
    return (
      <div className="container" id='profilecover'>
        <div className="profileheader">
          <div className="card card-body text-white mb-3 ">
            <div className="row">
                
              <img className="rounded-circle positionimage" src={this.props.profile.user.avatar} alt="" Style="width:170px;height:170px;" />
              <div className="btn-group mb-4" role="group">
                <Link to="/profile/editProfile" className="btn btn-light">
                  <i className="fas fa-user-circle  mr-1"></i> Edit Profile</Link>
                <a href="add-experience.html" className="btn btn-light">
                  <i className="fas fa-mail-bulk  mr-1"></i>
              Posts</a>
                <a href="/profile/followers" className="btn btn-light">
                  <i className="fas fa-arrow-circle-right  mr-1"></i>
                  {this.props.profile.followers.length} Followers</a>
                <a href="/profile/following" className="btn btn-light">
                  <i className="fas fa-arrow-circle-left  mr-1"></i>
                  {this.props.profile.following.length} Following</a>
              </div>

            
            </div>
            <div className="text-left">
              <h1 className="display-4 text-left" Style="margin-left:50px;margin-top:50px;">{this.props.profile.user.name}</h1>
            </div>
                
                  
                  
            <p className="socialicons">
                   
              {isEmpty(this.props.profile.social && this.props.profile.social.twitter) ? null : (
                <a
                  className="text-white p-2"
                  href={`//${this.props.profile.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

              {isEmpty(this.props.profile.social && this.props.profile.social.facebook) ? null : (
                <a
                  className="text-white p-2"
                  href={`//${this.props.profile.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

              {isEmpty(this.props.profile.social && this.props.profile.social.linkedin) ? null : (
                <a
                  className="text-white p-2"
                  href={`//${this.props.profile.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

              {isEmpty(this.props.profile.social && this.props.profile.social.youtube) ? null : (
                <a
                  className="text-white p-2"
                  href={`//${this.props.profile.social.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
  </p>
              
          </div>
        </div>
      </div>
    )
  }

}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  ...state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);

