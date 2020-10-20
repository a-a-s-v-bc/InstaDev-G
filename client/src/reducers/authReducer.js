import {SET_USER,SET_PASSWORD} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  actions:{}
};

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated:!isEmpty(action.payload),
        user: action.payload
      }
      case SET_PASSWORD:
        return {
          ...state,
         
          actions: action.payload
        }
    default:
      return state;
  }
}