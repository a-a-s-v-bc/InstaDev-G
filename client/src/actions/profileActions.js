import axios from 'axios';
import { GET_PROFILE } from "./types";

import { GET_ERRORS } from "./types";



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

