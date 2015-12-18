import * as types from '../actions/actionTypes';


export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case types.FETCH_TOPIC:
      return action.data;
    default:
      return state;
  }
}
