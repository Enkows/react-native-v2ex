import * as types from '../actions/actionTypes';
import topics from './topics.js';
import topic from './topic.js';


function currentView(state = '', action = {}) {
  switch (action.type) {
  case types.FETCH_TOPIC:
    return 'TopicDetail';
  case types.FETCH_TOPICS:
    return 'TopicList';
  default:
    return state;
  }
}

export {
  currentView,
  topics,
  topic,
};
