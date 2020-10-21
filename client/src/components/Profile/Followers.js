import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentFollowers,removeFollower } from "../../actions/profileActions";

class Followers extends Component {
  componentDidMount() {
    this.props.getCurrentFollowers();
  }

  render() {
    let followerslist = this.props.followers.followers;
    console.log("props:", this.props);

    if (this.props.followers.loaded === false) {
      return <div> Loading .....</div>;
    }
    return (
      <div className="container">
        <div className="row">
          <h2>
            All Followers
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
                  value="Remove"
                  className="btn btn-info"
                  Style="margin-bottom:10px;"
                  onClick={() => {
                    const userid = {user_id:`${user.id}`};
                    console.log("inside submit",userid);
                    this.props.removeFollower(userid, this.props.history);
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

Followers.propTypes = {
  getCurrentFollowers: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  followers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  followers: state.followers,
});

export default connect(mapStateToProps, { getCurrentFollowers ,removeFollower})(Followers);
