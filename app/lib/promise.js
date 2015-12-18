/*
 * code from redux-promise
 * https://github.com/acdlite/redux-promise
 */
import isPlainObject from 'lodash.isplainobject';


const validKeys = ['type', 'payload', 'error', 'meta'];

function isValidKey(key) {
  return validKeys.indexOf(key) > -1;
}

function isFSA(action) {
  return (
    isPlainObject(action) &&
    typeof action.type !== 'undefined' &&
    Object.keys(action).every(isValidKey)
  );
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => dispatch({ ...action, payload: error, error: true })
        )
      : next(action);
  };
}
