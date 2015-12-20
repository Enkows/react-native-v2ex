import * as types from './actionTypes';
import * as parser from '../lib/parser';


const options = {
  headers: {
    'User-Agent': 'V2EX-iOS/1.0.0 build/12',
  },
};

export function receiveData(data) {
  return data;
}

export function fetchTopicList() {
  return (dispatch) => {
    console.log('FETCH:', 'https://v2ex.com/recent?p=1');
    return fetch('https://v2ex.com/recent?p=1', options)
      .then(response => response.text())
      .then(html => dispatch(receiveData({
        type: types.FETCH_TOPICS,
        data: parser.getTopicList(html),
      })));
  };
}

export function fetchTopicDetail(topic) {
  return dispatch => {
    dispatch(receiveData({
      type: types.FETCH_TOPIC,
      data: topic,
    }));
    console.log('FETCH:', 'https://v2ex.com' + topic.uri);
    return fetch('https://v2ex.com' + topic.uri, options)
      .then(response => response.text())
      .then(html => dispatch(receiveData({
        type: types.FETCH_TOPIC,
        data: {
          id: topic.id,
          loaded: new Date(),
          ...parser.getTopicDetail(html),
        },
      })));
  };
}

export function fetchTopicComments(topic) {
  return dispatch => {
    console.log('FETCH:', 'https://v2ex.com/api/replies/show.json?topic_id=' + topic.id);
    return fetch('https://v2ex.com/api/replies/show.json?topic_id=' + topic.id, options)
      .then(response => response.json())
      .then(json => dispatch(receiveData({
        type: types.FETCH_TOPIC,
        data: { id: topic.id, comments: json },
      })));
  };
}
