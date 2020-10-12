import { SET_USER } from "./types";
import { SET_ERROR } from "./types";
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';


export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data
      }));

  return {
    type: SET_USER,
    payload: userData
  }
};

export const loginUser=(userData,history) => dispatch=> {

  axios
    .post("/api/users/login", User)
    .then(res=> {
      //save token to local storage (browser storage)
      const {token}=res.data;
      localStorage.setItem('jwtToken',token);
      
      //set token  to auth header
      setAuthToken(token);

    })
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
}