import React, { Component } from 'react'

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
          // onClick={() => {
          //   const handle = {handle:`${usr.handle}`};
          //   console.log("userdata:", handle);
          //   this.props.match.params.handle = handle.handle;
          //  this.props.getOthersProfile(this.props.match.params.handle);
            
           
          // }}
          />
            <span>{user.user.name}</span>
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

export default Search;