import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import { getOthersProfile,getCurrentProfile } from '../../actions/profileActions';
import axios from 'axios';
class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;
    
    console.log("post information in postitems", this.props);
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/profile/other">
              <img
                className="rounded-circle"
                src={post.avatar}
                alt=""
                Style="width:3.5em;height:3.5em;"
                onClick={() => {
                  console.log("post user id", post.user);
                  axios
                    .get(`/api/profile/user/${post.user}`)
                    .then((res) => {
                      console.log("res", res);
                      const handle = res.data.handle;
                      // this.props.match.params.handle = handle.handle;
                      console.log("handle before calling", handle);
                      if (auth.user.id === post.user) {
                        //this.props.getCurrentProfile();
                        window.location.href = "http://localhost:3000/profile";
                      } else {
                        
                        this.props.getOthersProfile(handle);
                      }
                     
                  
                 
                    })
                }}
              />
            </Link>
            <br />
            <p className="post-text-left">{post.name}</p>
          </div>
          <div className="col-md-10">
          <div Style="float:right;color:rgb(236, 196, 18)">{post.date}</div>
            <p className="post-text-left">{post.text}</p>
            {post.image ? <img src={post.image} alt="" className="post-image-size"></img> : ""}
            
            {showActions ? (
              <span className="align-bottom">
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light"
                  Style="width:130px;"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes),
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>

                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light"
                  Style="width:130px;"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>

                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-light"
                  Style="width:130px;"
                >
                  Comments
                  <span className="badge badge-light">{post.comments.length}</span>
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger"
                    Style="width:130px;"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getOthersProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike,getOthersProfile ,getCurrentProfile})(
  PostItem
);
