import {GET_PROFILE} from '../actions/types';

const initialState = {
  profile: {
    loaded : false
  },
  
};

export default function(state=initialState, action) {
  switch(action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: {
          ...action.payload,
          loaded:true
        }
      
      }
    default:
      return state;
  }
}