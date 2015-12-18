import * as types from './actionTypes';
import * as parser from '../lib/parser';


export function receiveData(data) {
  return data;
}

export function fetchTopicList() {
  return (dispatch) => {
    return fetch('https://v2ex.com/recent?p=1')
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
    console.log('Fetch', 'https://v2ex.com' + topic.uri);
    return fetch('https://v2ex.com' + topic.uri)
      .then(response => response.text())
      .then(parser.getTopicDetail)
      .then((data) => {
        return fetch('https://v2ex.com/api/replies/show.json?topic_id=' + topic.id)
          .then(response => response.json())
          .then(json => dispatch(receiveData({
            type: types.FETCH_TOPIC,
            data: {
              ...topic,
              ...data,
              comments: json,
            },
          })));
      });
  };
}
