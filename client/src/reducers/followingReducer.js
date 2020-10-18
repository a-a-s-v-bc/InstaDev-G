
import { GET_FOLLOWING } from '../actions/types';

const initialState = {
 following:[],
 
  loaded:false
};

export default function(state=initialState, action) {
  switch(action.type) {
    
     
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