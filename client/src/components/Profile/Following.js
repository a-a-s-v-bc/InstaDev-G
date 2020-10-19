import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentFollowing,unfollowUser } from "../../actions/profileActions";

class Following extends Component {
  componentDidMount() {
    this.props.getCurrentFollowing();
  }

 

  render() {
    let followerslist = this.props.following.following;
    console.log("props:", this.props);

    if (this.props.following.loaded === false) {
      return <div> Loading .....</div>;
    }


    return (
      <div className="container">
        <div className="row">
          <h2>
            All Followings
            <a
              href="/profile"
              className="btn btn-light"
              Style="margin-left:720px;margin-top:0px;"
            >
              Go Back
            </a>
          </h2>

          <br></br>
          <br></br>
          <br></br>

          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa fa-search"></i>
              </div>
            </div>
            <input
              className="form-control  "
              type="search"
              placeholder="Search"
              Style="font-size:1.25em;"
            />
          </div>

          <br></br>
          <br></br>
          <br></br>

          <div className="col-md-12">
            {followerslist.map((user, index) => (
              <div key={index}>
                <img
                  className="rounded-circle"
                  src={user.avatar}
                  alt=""
                  Style="width:15%;"
                />
                <span className="followername">{user.name} </span>
                <input
                  type="submit"
                  value="Unfollow"
                  className="btn btn-info"
                  Style="margin-bottom:10px;"
                  onClick={() => {
                    const userid = {user_id:`${user.id}`};
                    console.log("inside submit",userid);
                    this.props.unfollowUser(userid, this.props.history);
                    window.location.href = window.location.href;
                   
                  }}
                  
                />

              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Following.propTypes = {
  getCurrentFollowing: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  followers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  following: state.following,
});

export default connect(mapStateToProps, { getCurrentFollowing,unfollowUser })(Following);
