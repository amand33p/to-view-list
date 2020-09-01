import {
  setNotification,
  clearNotification,
} from '../context/entry/entryReducer';

let timeoutId = null;

const notify = (dispatch, message, severity, time) => {
  clearTimeout(timeoutId);
  dispatch(setNotification({ message, severity }));
  timeoutId = setTimeout(() => {
    dispatch(clearNotification());
  }, time * 1000);
};

export default notify;
