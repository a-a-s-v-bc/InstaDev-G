
import { GET_FOLLOWERS } from '../actions/types';


const initialState = {

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
     
    default:
      return state;
  }
}