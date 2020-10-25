import axios from "axios";
import { GET_PROFILE, SET_ERROR } from "./types";

import { GET_ERRORS } from "./types";
import { GET_FOLLOWERS } from "./types";
import { GET_FOLLOWING } from "./types";
import { SET_PASSWORD } from "./types";
import { SET_CURRENT_USER } from "./types";
import { GET_PROFILES } from "./types";
import { GET_OTHERUSER_PROFILE } from "./types";

export const getCurrentProfile = () => (dispatch) => {
  axios
    .get("/api/profile")
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: err.response,
      })
    );
};

export const createProfile = (profiledata, history) => (dispatch) => {
  axios
    .post("/api/profile", profiledata)
    .then((res) => history.push("/profile"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getCurrentFollowers = (user) => (dispatch) => {
  axios
    .get(`/api/profile/followers/${user}`)
    .then((res) => {
      dispatch({
        type: GET_FOLLOWERS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    );
};

export const getCurrentFollowing = (user) => (dispatch) => {
  axios
    .get(`/api/profile/following/${user}` )
    .then((res) => {
      dispatch({
        type: GET_FOLLOWING,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    );
};

export const unfollowUser = (user) => (dispatch) => {
  axios
    .put("/api/profile/unfollow", user)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    
    })
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
};


export const followUser = (user) => (dispatch) => {
  axios
    .put("/api/profile/follow", user)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    
    })
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
};

export const removeFollower = (user, history) => (dispatch) => {
  console.log("user value inside profile action for remove follower:", user);
  axios
    .put("/api/profile/removeFollower", user)
    .then((res) => history.push("/profile/followers"))
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
};

export const changeProfilePassword = (userdata) => (dispatch) => {
  axios
    .post("/api/profile/changepassword", userdata)
    .then((res) => {
      dispatch({
        type: SET_PASSWORD,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete account & profile
export const deleteAccount = (history) => (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then((res) => {
        history.push("/");
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        });
      })

      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

export const getAllProfiles = () => (dispatch) => {
  axios
    .get("/api/profile/all")
    .then((res) => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getOthersProfile = (handle) => (dispatch) => {
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) => {
      dispatch({
        type: GET_OTHERUSER_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    );
};
