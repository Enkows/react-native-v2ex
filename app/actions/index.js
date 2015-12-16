import * as types from './actionTypes';
import * as parser from '../lib/parser';


export function receiveData(data) {
  return data;
}

export async function fetchTopics() {
  const response = await fetch('https://v2ex.com/recent?p=1');
  const html = await response.text();
  const json = parser.getTopicList(html);
  return {
    type: types.FETCH_TOPICS,
    data: json,
  };
}

export async function fetchTopic(topic) {
  const response = await fetch('https://v2ex.com' + topic.uri);
  const html = await response.text();
  const json = parser.getTopicDetail(html);
  return {
    type: types.FETCH_TOPIC,
    data: {
      ...topic,
      content: json.content,
      addition: json.addition,
    },
  };
}

export async function fetchComments(topic) {
  const response = await fetch(`https://v2ex.com/api/replies/show.json?topic_id=${topic}`);
  const json = await response.json();
  console.log(json);
  return {
    type: types.FETCH_COMMENTS,
    data: json,
  };
}
