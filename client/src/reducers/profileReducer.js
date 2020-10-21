import { GET_PROFILE, SET_CURRENT_USER } from '../actions/types';


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
      case SET_CURRENT_USER:
        return {
          ...state,
          profile: null
        
        }
     
    default:
      return state;
  }
}