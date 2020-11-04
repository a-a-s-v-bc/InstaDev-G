import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllProfiles, getOthersProfile } from '../../actions/profileActions';
import { Link } from "react-router-dom";
import Search from '../common/Search';
import spinner from '../../img/Spinner-1s-200px.gif'

class AllProfiles extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
  }

  render() {
    let profilelist = this.props.profile.profiles;
    console.log("props:", this.props);

    if (this.props.profile.loaded === false) {
       return <div> <img
       src={spinner}
       style={{ width: '200px', margin: 'auto', display: 'block' }}
       alt="Loading..."
     /></div>;
    }
    return (
      <div className="container">
        <div className="row">
        

          <Search allusers={profilelist}/>       

          {/* <br></br>
          <br></br>
          <br></br>

          <div className="col-md-12">
            { profilelist.map((usr, index) => (
              <div key={index}>
                <Link to="/profile/other">
                <img
                  className="rounded-circle"
                  src={usr.user.avatar}
                  alt=""
                  Style="width:15%;height:170px;"
                  onClick={() => {
                    const handle = {handle:`${usr.handle}`};
                    console.log("userdata:", handle);
                    this.props.match.params.handle = handle.handle;
                   this.props.getOthersProfile(this.props.match.params.handle);
                    
                   
                  }}
                  />
                  </Link>
                  <Link to="/profile/other"><span className="followername"
                     onClick={() => {
                      const handle = {handle:`${usr.handle}`};
                      this.props.match.params.handle = handle.handle;
                      this.props.getOthersProfile(this.props.match.params.handle);
                      
                     
                    }}
                >{usr.user.name} </span></Link>
               
               
              
              </div>
            ))}
                  </div>*/}
        </div> 
      </div>
    );
  }
}

AllProfiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
 
};

const mapStateToProps = (state) => ({
  profile:state.profile,
});

export default connect(mapStateToProps, { getAllProfiles ,getOthersProfile})(AllProfiles);
