import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_REPOS,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './types';

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/profile`
        : 'http://localhost:5000/api/profile';
    const res = await axios.get(`${url}/me`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/profile`
        : 'http://localhost:5000/api/profile';
    const res = await axios.get(url);
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/profile`
        : 'http://localhost:5000/api/profile';
    const res = await axios.get(`${url}/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/profile`
        : 'http://localhost:5000/api/profile';
    const res = await axios.get(`${url}/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update a profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const url =
        process.env.NODE_ENV === 'production'
          ? `https://devconnector-social-media.herokuapp.com/api/profile`
          : 'http://localhost:5000/api/profile';
      const res = await axios.post(url, formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      if (!edit) {
        history.push('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/profile`
        : 'http://localhost:5000/api/profile';
    const res = await axios.put(`${url}/experience`, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/profile`
        : 'http://localhost:5000/api/profile';
    const res = await axios.put(`${url}/education`, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/profile`
        : 'http://localhost:5000/api/profile';
    const res = await axios.delete(`${url}/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/profile`
        : 'http://localhost:5000/api/profile';
    const res = await axios.delete(`${url}/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  try {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      const url =
        process.env.NODE_ENV === 'production'
          ? `https://devconnector-social-media.herokuapp.com/api/profile`
          : 'http://localhost:5000/api/profile';
      await axios.delete(url);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Your account has been permanently deleted'));
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
