import {
  setNotification,
  clearNotification,
} from '../context/entry/entryReducer';

let duration = 5;
let timeoutId = null;

const notify = (dispatch, message, severity) => {
  clearTimeout(timeoutId);
  dispatch(setNotification({ message, severity }));
  timeoutId = setTimeout(() => {
    dispatch(clearNotification());
  }, duration * 1000);
};

export default notify;
