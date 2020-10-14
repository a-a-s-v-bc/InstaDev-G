import axios from 'axios';
import { GET_PROFILE } from "./types";



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
