import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      image:"",
      imageFile: null,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      image: this.state.image,
      name: user.name,
      avatar: user.avatar,
    };

    this.props.addPost(newPost);
    this.setState({ text: "" });
    this.setState({ image: "" });
    
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

fileSelectedHandler = (event) => {
  this.setState({
    imageFile: event.target.files[0],
  });
};

fileUploadHandler = () => {
  const fd = new FormData();
  fd.append("file", this.state.imageFile);
  fd.append("upload_preset", "instadevgPosts");
  fd.append("cloud_name", "instadevg1");

  fetch("https://api.cloudinary.com/v1_1/instadevg1/image/upload", {
    method: "POST",
    body: fd,
  })
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        image: data.url,
      });
    })
    .catch((err) => console.error(err));

}



  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-body">
          <div>
            <h2>Create your post!</h2>
            <h5>For Image upload - Give a title, Select an image, upload it, and submit!</h5>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Your title"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  //error={errors.text}
                />
              </div>
              <button
                type="submit"
                className="btn"
                Style="width:180px;"
              >
                Submit
              </button>
              </form>
              <div className="form-group">
                <input
                  style={{ display: "none" }}
                  type="file"
                  onChange={this.fileSelectedHandler}
                  ref={(fileInput) => (this.fileInput = fileInput)}
                />
              <div>
                {this.state.image ? <img src={this.state.image} alt="" Style="width:120px;
  height:100px;"></img> : ""}
                  <button
                    type="button"
                    onClick={this.fileUploadHandler}
                    className="btn"
                    Style="width:180px;"
                  >
                    Upload Image
                  </button>

                  <button
                    className="btn"
                    onClick={() => this.fileInput.click()}
                    Style="width:180px;"
                  >
                    Select Image
                  </button>
                </div>
              </div>
            
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPost })(PostForm);
