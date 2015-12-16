import * as types from '../actions/actionTypes';

const initialState = {
  content: '',
  comments: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case types.FETCH_TOPIC:
    return action.data;
  default:
    return state;
  }
}
