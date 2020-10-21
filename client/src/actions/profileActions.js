import axios from 'axios';
import { GET_PROFILE, SET_ERROR } from "./types";

import { GET_ERRORS } from "./types";
import { GET_FOLLOWERS } from "./types";
import { GET_FOLLOWING } from "./types";
import { SET_PASSWORD } from "./types";
import { SET_CURRENT_USER } from "./types";



export const getCurrentProfile=() => dispatch=> {

  axios
    .get("/api/profile")
    .then((res)=> {
      dispatch({
     type: GET_PROFILE,
   payload: res.data
 });
    })
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: err.response.data
      })
    );
}

export const createProfile= (profiledata,history) => dispatch=> {

  axios
    .post("/api/profile",profiledata)
    .then((res) => history.push("/profile"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}


export const getCurrentFollowers=() => dispatch=> {

  axios
    .get("/api/profile/followers")
    .then((res)=> {
      dispatch({
     type: GET_FOLLOWERS,
   payload: res.data
 });
    })
    .catch((err) =>
      dispatch({
        type: GET_FOLLOWERS,
        payload: err.response
      })
    );
}


export const getCurrentFollowing=() => dispatch=> {

  axios
    .get("/api/profile/following")
    .then((res)=> {
      dispatch({
     type: GET_FOLLOWING,
   payload: res.data
 });
    })
    .catch((err) =>
      dispatch({
        type: GET_FOLLOWING,
        payload: err.response
      })
    );
}



export const unfollowUser=(user,history) => dispatch=> {

  axios
    .put('/api/profile/unfollow',user)
    .then((res)=>  history.push('/profile/following')
  
    )
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data
      })
    );
}

export const removeFollower=(user,history) => dispatch=> {

  axios
    .put('/api/profile/removeFollower',user)
    .then((res)=>  history.push('/profile/followers')
  
    )
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data
      })
    );
}


export const changeProfilePassword= (userdata) => dispatch=> {

  axios
    .post("/api/profile/changepassword",userdata)
    .then((res) =>  {
      dispatch({
     type: SET_PASSWORD,
   payload: res.data
 });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Delete account & profile
export const deleteAccount = (history) => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res => {
        history.push("/");
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      }
      )
  
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};