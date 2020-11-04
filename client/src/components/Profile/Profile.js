import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from '../../actions/profileActions';
import isEmpty from "../../validation/is-empty";
import { getAllUserPosts,clearPost} from "../../actions/postActions";
import PostFeed from "../posts/PostFeed";
import Spinner from '../common/Spinner';



import spinner from "../../img/Spinner-1s-200px.gif";

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      postcalled: false,
      norepeate : false,
    }
    // this.onChange = this.onChange.bind(this);
 }
//  onChange(e) {
//   this.setState({ [e.target.name]: e.target.value });
// }
  componentDidMount() {
  
 
    this.props.getCurrentProfile();
    
  }
  shouldComponentUpdate(nextProps,nextState) {
    
    
  
    if ( nextState.postcalled === false && nextProps.profile.user && nextProps.profile.user._id ) {
      const id = nextProps.profile.user._id;
      console.log("id current user value:", id);
      this.props.getAllUserPosts(id);
      this.setState({ postcalled: true });

    }
 
    return true;
   }
  render() {
    console.log("profile render props", this.props);
  
    if(this.props.profile.loaded === false) {
      return (
        <div>  <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      /></div>
      )
    }
    
    if (this.props.profile.data && this.props.profile.data.noprofile) {
      // if (this.norepeate) {
      //   console.log("repeat");
      //   this.setState({ norepeate: false });
      return (
        <div className="container" Style="margin-bottom:600px;margin-top:15px;">
        <div className="btn-group mb-4"  role="group">
          <a href="/profile/createProfile" className="btn btn-light">
            <i className="fas fa-user-circle  mr-1"></i> Create Profile</a>
          </div>
          </div>
      )
      
      
    }
    const { userposts } = this.props.post;
    console.log("this props post :", this.props,userposts);
let postContent;

if (userposts === null || this.props.post.loading) {
  postContent = <Spinner />;
} else {
  console.log("posts:", userposts);
  postContent = <PostFeed posts={userposts} />;
    }
    
function refreshPage() {
  window.location.reload(false);
}
 
    return (
      <div className="container" >
         <div className="profileheader"> 
        <div className="col-sma-3 col-tab-3 col-lap-3">
          <div className="card card-body text-white mb-3 ">
            <div className="row ">
                
              <img className="rounded-circle positionimage" src={this.props.profile.user.avatar} alt="" Style="width:170px;height:170px;" />
              <div className="btn-group mb-4" role="group">
              <div Style="margin-top:50px">
                  <i className="fas fa-mail-bulk  mr-1"></i>
                  {this.props.post.userposts.length} Posts</div>
                <Link to="/profile/editProfile" className="btn btn-light">
                  <i className="fas fa-user-circle  mr-1"></i> Edit Profile</Link>
                
                <a href={`/profile/followers/${this.props.profile.user._id}`} className="btn btn-light">
                  <i className="fas fa-arrow-circle-right  mr-1"></i>
                  {this.props.profile.followers.length} Followers</a>
                <a href={`/profile/following/${this.props.profile.user._id}`} className="btn btn-light">
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
        <br></br>
        <br></br>
        <br></br>
        <div Style="font-weight: Bold;"> Posts</div>
        <p Style="background-color:white;" onClick={refreshPage}> {postContent}</p>
         

      </div>
      
    )
  }

}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getAllUserPosts:PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  clearPost:PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.profile,
  post:state.post,
});

export default connect(mapStateToProps, { getCurrentProfile,getAllUserPosts,clearPost })(Profile);

