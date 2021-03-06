import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = new Date().getTime().toString();

    dispatch({
      type: SET_ALERT,
      payload: { id, msg, alertType },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
