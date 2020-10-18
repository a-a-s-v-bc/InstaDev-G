
import { GET_FOLLOWERS } from '../actions/types';
import { GET_FOLLOWING } from '../actions/types';

const initialState = {
 following:[],
  followers: [],
  loaded:false
};

export default function(state=initialState, action) {
  switch(action.type) {
    
      case GET_FOLLOWERS:
        return {
          ...state,
          followers:[ 
            ...action.payload],
          loaded:true
      }
      case GET_FOLLOWING:
        return {
          ...state,
          following:[ 
            ...action.payload],
          loaded:true
      }
    default:
      return state;
  }
}