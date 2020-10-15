import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";

import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { withRouter } from "react-router-dom";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor() {
    super();
    //Local State of CreateProfile Component
    this.state = {
      name: "",
      handle: "",
      status: "",
      email: "",
      avatar: "",
      phone: "",
      website: "",
      bio: "",
      desc: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      youtube: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const userProfileData = {
      name: this.state.name,
      handle: this.state.handle,
      status: this.state.status,
      email: this.state.email,

      phone: this.state.phone,
      website: this.state.website,
      bio: this.state.bio,
      desc: this.state.desc,
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
    };

    this.props.createProfile(userProfileData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" },
    ];

    return (
      <div className="create-profile">
        <a href="/profile/changePassword" className="btn btn-light">
          Change Password
        </a>
        <a href="/profile" className="btn btn-light">
          Go Back
        </a>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1
                className="display-4 text-center"
                Style="font-weight:bold; margin-top:10px;"
              >
                Edit Your Profile
              </h1>

              <small className="form-text">* = required field</small>
              <div className="form-group">
                <img
                  className="rounded-circle Editimage"
                  src={this.props.auth.user.avatar}
                  alt=""
                />
                <a href="/profile" className="form-text Profilechangeimage">
                  Change Profile Image
                </a>
              </div>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.props.auth.user.name}
                  onChange={this.onChange}
                  error={errors.name}
                  info="Name"
                />

                <TextFieldGroup
                  placeholder="* Profile handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  name="handle"
                  info="A unique handle for your profile URL. Your full name,
                    company name, nickname, etc (This CAN'T be changed later)"
                />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />

                <TextFieldGroup
                  placeholder="Email"
                  value={this.props.auth.user.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="Email Address"
                  name="email"
                />

                <TextFieldGroup
                  placeholder="Contact Number"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                  info="Phone Number"
                  name="phone"
                />

                <TextFieldGroup
                  placeholder="Website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Website"
                  name="website"
                />

                <TextFieldGroup
                  placeholder="Bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Bio"
                  name="bio"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
