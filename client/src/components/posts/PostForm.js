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
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

fileSelectedHandler = (event) => {
  console.log("*** selected file name", event.target.files[0]);
  this.setState({
    imageFile: event.target.files[0],
  });
  console.log("*** this.state", this.state);
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

      console.log(data.url);
      console.log("*** here is the image file**", this.image);
    })
    .catch((err) => console.error(err));

}



  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
              <div className="form-group">
                <input
                  style={{ display: "none" }}
                  type="file"
                  onChange={this.fileSelectedHandler}
                  ref={(fileInput) => (this.fileInput = fileInput)}
                />
                <div>
                  <button
                    className="btn btn-light"
                    //Style="float:left;margin-left:55px;margin-bottom-20px;"
                    onClick={() => this.fileInput.click()}
                  >
                    Pick Image File
                  </button>
                  <button
                    type="button"
                    onClick={this.fileUploadHandler}
                    className="btn btn-light"
                    //Style="float:left;margin-left:55px;margin-bottom-20px;"
                  >
                    Upload Image
                  </button>
                </div>
              </div>
            </form>
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
