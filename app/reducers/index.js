import { each, assign, pluck } from 'lodash';
import * as types from '../actions/actionTypes';


const storage = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_TOPICS:
      each(action.data, t => {
        state[t.id] = state[t.id] ? state[t.id] : {};
        return assign(state[t.id], t);
      });
      return { ...state };

    case types.FETCH_TOPIC:
      state[action.data.id] = assign(state[action.data.id], action.data);
      return { ...state };

    default:
      return state;
  }
};

const topicDetailView = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_TOPIC:
      return action.data.id;

    default:
      return state;
  }
};

const topicListView = (state = [], action) => {
  switch (action.type) {
    case types.REFRESH_TOPICS:
      return pluck(action.data, 'id');

    case types.FETCH_TOPICS:
      return [].concat(state, pluck(action.data, 'id'));

    default:
      return state;
  }
};

export {
  storage,
  topicDetailView,
  topicListView,
};
