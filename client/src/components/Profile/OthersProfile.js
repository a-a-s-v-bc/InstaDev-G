import React, { Component } from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import isEmpty from "../../validation/is-empty";
import {
  getCurrentProfile,
  getOthersProfile,
  followUser,
  getCurrentFollowing,
  unfollowUser,
  
} from "../../actions/profileActions";
import { getAllUserPosts, clearPost } from "../../actions/postActions";
import PostFeed from "../posts/PostFeed";
import spinner from "../../img/Spinner-1s-200px.gif";
import Spinner from '../common/Spinner';


class OthersProfile extends Component {
  constructor() {
    super();
    this.state = {
      postcalled: false,

    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.postcalled === false &&
      nextProps.profile.OtherUserProfile.user &&
      nextProps.profile.OtherUserProfile.user._id
    ) {
      console.log("nextprops:", nextProps);

      const id = nextProps.profile.OtherUserProfile.user._id;
      console.log("id of other user value:", id);
      this.props.getAllUserPosts(id);
      this.setState({ postcalled: true });
      
    }
    return true;
  }

  render() {
    console.log("props inside the OthersProfile", this.props);
    if (
      this.props.profile.OtherUserProfile.loaded === false ||
      this.props.profile.profile.loaded === false
    ) {
      return <div> <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    /></div>;
    }
    const userid = this.props.profile.OtherUserProfile.user._id;
    const handle = this.props.profile.OtherUserProfile.handle;
    let isFollowing = false;
    if (this.props.profile.profile.following.length > 0) {
      if (this.props.profile.profile.following.includes(userid)) {
        isFollowing = true;
      }
    }

    //  let check = false;
    // console.log("other id for param:", userid);
    //  if (check === false) {

    //    this.props.getPost(userid);
    //    check = true;
    //  }

    const { userposts } = this.props.post;
    console.log("this props post :", this.props,userposts);
    let postContent;

    if (userposts === null || this.props.post.loading) {
      postContent = <Spinner />;
    } else {
      console.log("posts:", userposts);
      postContent = <PostFeed posts={userposts} />;
    }

    return (
      <div className="container">
        <div className="profileheader">
          <div className="card card-body text-white mb-3 " Style="height:70%;margin-bottom:200px;">
            <div className="row">
              <img
                className="rounded-circle positionimage"
                src={this.props.profile.OtherUserProfile.user.avatar}
                alt=""
                
              />
              <div className="btn-group mb-4" role="group">
                <div Style="margin-top:55px;">
                  <i className="fas fa-mail-bulk  mr-1"></i>
                  {this.props.post.userposts.length} Posts
                </div>
                <Link
                  to={`/profile/followers/${this.props.profile.OtherUserProfile.user._id}`}
                  className="btn"
                >
                  <i className="fas fa-arrow-circle-right  mr-1"></i>
                  {this.props.profile.OtherUserProfile.followers.length}{" "}
                  Followers
                </Link>
                <a
                  href={`/profile/following/${this.props.profile.OtherUserProfile.user._id}`}
                  className="btn"
                >
                  <i className="fas fa-arrow-circle-left  mr-1"></i>
                  {this.props.profile.OtherUserProfile.following.length}{" "}
                  Following
                </a>
              </div>
            </div>
            <div className="text-left">
              <h1
                className="display-4 text-left"
                Style="margin-top:50px;"
              >
                {this.props.profile.OtherUserProfile.user.name}
              </h1>
              <div>
                <button
                  className="btn"
                  Style="float:left;margin-top:20px;margin-bottom:10px;"
                  onClick={() => {
                    const usrid = { user_id: `${userid}` };
                    console.log("inside submit", usrid);
                    isFollowing
                      ? this.props.unfollowUser(usrid)
                      : this.props.followUser(usrid);

                    console.log("handle:", handle);
                    this.props.match.params.handle = handle;
                    this.props.getOthersProfile(this.props.match.params.handle);
                  }}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>

            <p className="socialicons">
              {isEmpty(
                this.props.profile.OtherUserProfile.social &&
                  this.props.profile.OtherUserProfile.social.twitter
              ) ? null : (
                <a
                  className="text-white p-2"
                  href={`//${this.props.profile.OtherUserProfile.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
              )}

              {isEmpty(
                this.props.profile.OtherUserProfile.social &&
                  this.props.profile.OtherUserProfile.social.facebook
              ) ? null : (
                <a
                  className="text-white p-2"
                  href={`//${this.props.profile.OtherUserProfile.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}

              {isEmpty(
                this.props.profile.OtherUserProfile.social &&
                  this.props.profile.OtherUserProfile.social.linkedin
              ) ? null : (
                <a
                  className="text-white p-2"
                  href={`//${this.props.profile.OtherUserProfile.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}

              {isEmpty(
                this.props.profile.OtherUserProfile.social &&
                  this.props.profile.OtherUserProfile.social.youtube
              ) ? null : (
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
        <br></br>
        <br></br>
        <br></br>
        
        <p Style="background-color:white;"> {postContent}</p>
      </div>
    );
  }
}

OthersProfile.propTypes = {
  getCurrentFollowing: PropTypes.func.isRequired,
  OtherUserProfile: PropTypes.object.isRequired,
  following: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getAllUserPosts: PropTypes.object.isRequired,
  clearPost: PropTypes.object.isRequired,
  unfollowUser: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  following: state.following,
  post: state.post,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getOthersProfile,
  followUser,
  getCurrentFollowing,
  getAllUserPosts,
  clearPost,
  unfollowUser,
})(OthersProfile);
