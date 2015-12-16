import * as types from '../actions/actionTypes';

const initialState = {
  count: 0,
  data: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case types.FETCH_TOPICS:
    const data = state.data.concat(action.data);
    return {
      count: data.length,
      data: data,
    };
  default:
    return state;
  }
}
