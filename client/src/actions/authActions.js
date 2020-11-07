import { SET_USER } from "./types";
import { SET_ERROR ,CLEAR_ERRORS} from "./types";
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => {
      axios
        .post('/api/users/confirmEmail',res)
        .then(res => history.push('/login'))
        .catch(err => console.log(err)
          )
     
    })
    .catch(err =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data
      }));

  
};

export const loginUser=userData => dispatch=> {
  dispatch(clearErrors());
  axios
    .post("/api/users/login", userData)
    .then((res)=> {
      //save token to local storage (browser storage)
      const {token}=res.data;
      localStorage.setItem('jwtToken',token);

      //set token  to auth header
      setAuthToken(token);

      // decode token

      const decoded= jwt_decode(token);

      // write user info to redux
     dispatch({
     type: SET_USER,
   payload: decoded,
 });
    })
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
}


/*export const resetpasswordUser = userData => dispatch => {
  axios
    .post("/api/users/resetpassword", userData)
    .then((res) => {
      //save token to local storage (browser storage)
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      //set token  to auth header
      setAuthToken(token);

      // decode token

      const decoded = jwt_decode(token);

      // write user info to redux
      dispatch({
        type: SET_USER,
        payload: decoded,
      });
    })
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
}*/

export const passwordresetUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/forgotpassword/:token", userData)
    .then((res) =>{ 
      alert("SUCCESS! YOUR PASSWORD HAS BEEN RESET. KINDLY LOGIN");
      history.push("/login")})
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
};

export const resetpasswordUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/resetpassword", userData)
    .then((res) => {
      
     history.push("/emailsenttext");
    })
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
};


export const logoutUser=()=> dispatch=>{

  // remove token from local storage

  localStorage.removeItem("jwtToken");

  // remove token from axios header

  setAuthToken(false);

  //reset user data in redux store

  dispatch({
    type: SET_USER,
    payload: {},
  });
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};