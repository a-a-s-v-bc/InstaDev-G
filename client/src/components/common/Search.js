import React, { Component } from 'react';
import Link from 'react-dom';
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
          return user.user.name.includes(this.state.filtertext) ? (<div className="followername"><img
            className="rounded-circle"
            src={user.user.avatar}
            alt=""
            Style="width:15%;height:170px;"
          onClick={() => {
            const handle = {handle:`${user.handle}`};
            console.log("userdata:", handle);
            this.props.match.params.handle = handle.handle;
           this.props.getOthersProfile(this.props.match.params.handle);
            
           
          }}
          />
             <a href="/profile/other" ><span
             onClick={() => {
              const handle = {handle:`${user.handle}`};
              console.log("userdata:", handle.handle);
                this.props.match.params = handle ;
               // console.log("params:", this.props.match.params.handle);
                this.props.getOthersProfile(handle.handle);
                
              
             
            }}>{user.user.name}</span></a>
            </div>) : null
        })}
        <br></br>
            <br></br>
            <br></br>
            <p>********************************Search Results End***********************************</p></div> : null}
      
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

