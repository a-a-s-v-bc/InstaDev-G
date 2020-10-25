import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import followersReducer from './followersReducer';
import followingReducer from './followingReducer';
import profileReducer from './profileReducer';
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  followers: followersReducer,
  following: followingReducer,
  post: postReducer,
});