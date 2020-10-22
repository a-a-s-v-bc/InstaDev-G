import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllProfiles, getOthersProfile } from '../../actions/profileActions';

class AllProfiles extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
  }

  render() {
    let profilelist = this.props.profile.profiles;
    console.log("props:", this.props);

    if (this.props.profile.loaded === false) {
       return <div> Loading .....</div>;
    }
    return (
      <div className="container">
        <div className="row">
        

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
            { profilelist.map((usr, index) => (
              <div key={index}>
                <img
                  className="rounded-circle"
                  src={usr.user.avatar}
                  alt=""
                  Style="width:15%;height:170px;"
                  onClick={() => {
                    const handle = {handle:`${usr.handle}`};
                    console.log("userdata:", handle);
                    this.props.match.params.handle = handle.handle;
                    this.props.getOthersProfile(this.props.match.params.handle, this.props.history);
                    
                   
                  }}
                />
                <span className="followername"
                     onClick={() => {
                      const handle = {handle:`${usr.handle}`};
                      this.props.match.params.handle = handle.handle;
                      this.props.getOthersProfile(this.props.match.params.handle, this.props.history);
                      
                     
                    }}
                >{usr.user.name} </span>
               
               
              
              </div>
            ))}
          </div>
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
