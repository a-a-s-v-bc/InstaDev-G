import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentFollowers, removeFollower,getOthersProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import Search from '../common/Search';
import spinner from '../../img/Spinner-1s-200px.gif';

class Followers extends Component {
  componentDidMount() {
    
 
    console.log("props inside follower:", this.props);
    const user = this.props.match.params.user_id;
    
    this.props.getCurrentFollowers(user);
  }

  render() {
    const useridPassed = this.props.match.params.user_id;
    let nonuser = false;
    //let nonuser2 = false;
    console.log("UseridPassed:",useridPassed)
    if (this.props.user.id === useridPassed) {
      nonuser = true;
    }
    let followerslist = this.props.followers.followers;
    
    console.log("props:", this.props);

    if (this.props.followers.loaded === false ) {
      return <div> <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    /></div>;
    }
    return (
      <div className="container">
        <div className="row">
          <h2>
            Followers {followerslist.length} 
            {/* <a href="/profile"
            
              className="btn"
              Style="margin-left:720px;margin-top:0px;"
              
            >
              Go Back
            </a> */}
          </h2>

          <br></br>
          <br></br>
          <br></br>

          <Search allusers={followerslist}/>
          <br></br>
          <br></br>
          <br></br>

          <div className="col-md-12">
            {followerslist.map((user, index) => (
              <div className="userlist" key={index}>
                <img
                  className="rounded-circle positionimage"
                  src={user.user.avatar}
                  alt=""
                
                />
                <Link to="/profile/other"><span className="followername"
                 onClick={() => {
                  const handle = {handle:`${user.handle}`};
                  this.props.match.params.handle = handle.handle;
                  this.props.getOthersProfile(this.props.match.params.handle);
                  
                 
                }}>{user.user.name} </span></Link>
                {nonuser ? <input
                  type="submit"
                  value="Remove"
                  className="btn"
                  Style="margin-bottom:10px;"
                  onClick={() => {
                    const userid = { user_id:user.user._id  };
                
                    this.props.removeFollower(userid, this.props.history);
                    window.location.href = window.location.href;
                   
                  }}
                /> : ""}
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
  auth: PropTypes.object.isRequired,
  getOthersProfile: PropTypes.func.isRequired,
  removeFollower:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  followers: state.followers,
  ...state.profile,
  ...state.auth,
});

export default connect(mapStateToProps, { getCurrentFollowers ,removeFollower,getOthersProfile})(Followers);
