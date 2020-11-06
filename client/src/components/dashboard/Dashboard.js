import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostFeed from "../posts/PostFeed";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import { getCurrentProfile } from "../../actions/profileActions";

class Posts extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getPosts();
    
  }

  render() {
    const { posts, loading } = this.props.post;
    console.log("props in dashboard:", this.props);
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    if (this.props.profile.data && this.props.profile.data.noprofile) {
      // if (this.norepeate) {
      //   console.log("repeat");
      //   this.setState({ norepeate: false });
      return (
        <div className="container" >
          <div className="row">
 
          <a href="/profile/createProfile" className="btn" Style="margin-left:0px;width:400px;margin-bottom:50px;">
            <i className="fas fa-user-circle  mr-1"></i> Create Profile</a>
            </div>
            
          </div>
      )
      
      
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  ...state.profile,
});

export default connect(mapStateToProps, { getPosts,getCurrentProfile })(Posts);
