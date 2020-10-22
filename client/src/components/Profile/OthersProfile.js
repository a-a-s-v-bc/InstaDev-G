import React, { Component } from 'react';


import PropTypes from "prop-types";

import { connect } from "react-redux";
//import { getOthersProfile } from '../../actions/profileActions';

import isEmpty from "../../validation/is-empty";
import {getCurrentProfile} from '../../actions/profileActions';

 class OthersProfile extends Component {

   componentDidMount() {
     this.props.getCurrentProfile();
   }
   
   render() {
    
     
    
    console.log("props inside the OthersProfile", this.props);
    if(this.props.profile.OtherUserProfile.loaded === false) {
      return (
        <div> Loading .....</div>
      )
    }
    const userid = this.props.profile.OtherUserProfile.user.id;
    let but;
    if (this.props.profile.profile.following.includes(userid)) {
      but=(<div><button className="btn btn-light" Style="float:left;">Follow</button></div>)
    } else {
     but=(<div><button className="btn btn-light"Style="float:left;margin-top:10px;">Unfollow</button></div>)
    }
   
    return (
      <div className="container" id='profilecover'>
        <div className="profileheader">
          <div className="card card-body text-white mb-3 ">
            <div className="row">
                
              <img className="rounded-circle positionimage" src={this.props.profile.OtherUserProfile.user.avatar} alt="" Style="width:170px;height:170px;" />
              <div className="btn-group mb-4" role="group">
               
                <a href="add-experience.html" className="btn btn-light">
                  <i className="fas fa-mail-bulk  mr-1"></i>
              Posts</a>
                <a href="/profile/followers" className="btn btn-light">
                  <i className="fas fa-arrow-circle-right  mr-1"></i>
                  {this.props.profile.OtherUserProfile.followers.length} Followers</a>
                <a href="/profile/following" className="btn btn-light">
                  <i className="fas fa-arrow-circle-left  mr-1"></i>
                  {this.props.profile.OtherUserProfile.following.length} Following</a>
              </div>

            
            </div>
            <div className="text-left">
              <h1 className="display-4 text-left" Style="margin-left:50px;margin-top:50px;">{this.props.profile.OtherUserProfile.user.name}</h1>
              {but}
       
            </div>
                
                  
                  
            <p className="socialicons">
                   
              {isEmpty(this.props.profile.OtherUserProfile.social && this.props.profile.OtherUserProfile.social.twitter) ? null : (
                <a
                  className="text-white p-2"
                  href={`//${this.props.profile.OtherUserProfile.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

              {isEmpty(this.props.profile.OtherUserProfile.social && this.props.profile.OtherUserProfile.social.facebook) ? null : (
                <a
                  className="text-white p-2"
                  href={`//${this.props.profile.OtherUserProfile.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

              {isEmpty(this.props.profile.OtherUserProfile.social && this.props.profile.OtherUserProfile.social.linkedin) ? null : (
                <a
                  className="text-white p-2"
                  href={`//${this.props.profile.OtherUserProfile.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

              {isEmpty(this.props.profile.OtherUserProfile.social && this.props.profile.OtherUserProfile.social.youtube) ? null : (
                <a
                  className="text-white p-2"
                  href={`//${this.props.profile.OtherUserProfile.social.youtube}`}
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

OthersProfile.propTypes = {
 

  OtherUserProfile: PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  
});


export default connect(mapStateToProps, { getCurrentProfile})(OthersProfile);

