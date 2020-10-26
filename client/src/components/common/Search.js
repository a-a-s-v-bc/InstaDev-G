import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOthersProfile } from "../../actions/profileActions";

class Search extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      filtertext :"",
    }
  }
  componentDidMount() {
    console.log("inside search:",this.props);
}

  onChange = (e) => {
    console.log(e.target.value);
    this.setState({ filtertext: e.target.value });
  }
  goToOtherProfile= () => {
    
    return (this.props.history.push("/profile/other"));
  }
  
  render() {
    const noprofilefound = "No Profile Found";
    return (
      <div className="row" Style="width:100%;">

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
            onChange={this.onChange}
            />
        </div>
        { this.state.filtertext ? <div>{this.props.allusers.map((user, index) => {
          // console.log("uservalue:", user);
          return user.user.name.includes(this.state.filtertext) ? (<div className="followername" Style="background:rgb(193, 153, 212);width:1100px;">
            <Link to="/profile/other"><img
            className="rounded-circle"
            src={user.user.avatar}
            alt=""
            Style="width:3.5em;height:3.5em;"
            onClick={() => {
              const handle = { handle: `${user.handle}` };
              console.log("userdata:", handle);
             // this.props.match.params.handle = handle.handle;
              this.props.getOthersProfile(handle.handle);
             
           
          }}
          /></Link>
             <Link to="/profile/other" onClick={() => {
              const handle = {handle:`${user.handle}`};
              console.log("userdata:", handle.handle);
                // this.props.match.params.handle = handle.handle ;
               // console.log("params:", this.props.match.params.handle);
                this.props.getOthersProfile(handle.handle);
                
              
             
            }}><span
             >{user.user.name}</span></Link>
            </div>) : null
        })}
        <br></br>
            <br></br>
            <br></br>
            </div> : null}
      
      </div>
    )
  }
}

Search.propTypes = {
  getOthersProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
 
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  
});

export default connect(mapStateToProps, {getOthersProfile})(Search);

