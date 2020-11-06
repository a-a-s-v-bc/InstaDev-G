import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentFollowing, unfollowUser, followUser,getOthersProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import Search from "../common/Search";
import spinner from '../../img/Spinner-1s-200px.gif';

class Following extends Component {
  componentDidMount() {
   
    console.log("props inside following:", this.props);
    const user = this.props.match.params.user_id;
    
    this.props.getCurrentFollowing(user);
    
  }

 
      
   
  
  
  render() {
    const useridPassed = this.props.match.params.user_id;
    let nonuser = false;
    //let nonuser2 = false;
    console.log("props in render of following:", this.props)
    if (this.props.user.id === useridPassed) {
      nonuser = true;
    }
      let followerslist = this.props.following.following;
      if (this.props.following.loaded === false) {
        return <div> <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      /></div>;
    }
    
      // if (followerslist.includes(this.props.user.id)) {
      //   nonuser2 = true;
      //   console.log("exists");
      // }

      return (
        <div className="container">
          <div className="row">
            <h2>
              Following  {followerslist.length} 
            {/* <a href="/profile"
               
                className="btn"
                Style="margin-right:0px;margin-top:0px;margin-left:30px"
               
              >
                Go Back
            </a> */}
            </h2>

           
{/* 
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
            </div> */}

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
                      
                     
                    }}
                  >{user.user.name} </span></Link>
                  {nonuser ? (<input
                    type="submit"
                    value="Unfollow"
                    className="btn"
                    Style="margin-bottom:10px;"
                    onClick={() => {
                      const userid = { user_id: `${user.user._id}` };
                      console.log("inside submit", userid);
                      this.props.unfollowUser(userid, this.props.history);
                      window.location.href = window.location.href;
                   
                    }}
                  
                  />) : ""
                  }

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
 following: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  followUser: PropTypes.object.isRequired,
  getOthersProfile:PropTypes.object.isRequired,
 
};

const mapStateToProps = (state) => ({
  following: state.following,
  ...state.profile,
  ...state.auth,
});

export default connect(mapStateToProps, { getCurrentFollowing,unfollowUser,followUser,getOthersProfile })(Following);
