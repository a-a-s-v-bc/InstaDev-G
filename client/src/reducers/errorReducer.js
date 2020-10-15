import { SET_ERROR } from '../actions/types';
import { GET_ERRORS } from '../actions/types';

const initialState = {};

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_ERROR:
      return action.payload;
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}