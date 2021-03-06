import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

// Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/posts`
        : 'http://localhost:5000/api/posts';
    const res = await axios.get(url);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Like
export const addLike = (postId) => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/posts`
        : 'http://localhost:5000/api/posts';
    const res = await axios.put(`${url}/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove Like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/posts`
        : 'http://localhost:5000/api/posts';
    const res = await axios.put(`${url}/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Post
export const deletePost = (postId) => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/posts`
        : 'http://localhost:5000/api/posts';
    await axios.delete(`${url}/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/posts`
        : 'http://localhost:5000/api/posts';
    const res = await axios.post(url, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Posts
export const getPost = (id) => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/posts`
        : 'http://localhost:5000/api/posts';
    const res = await axios.get(`${url}/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/posts`
        : 'http://localhost:5000/api/posts';
    const res = await axios.post(`${url}/comment/${postId}`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://devconnector-social-media.herokuapp.com/api/posts`
        : 'http://localhost:5000/api/posts';
    await axios.delete(`${url}/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
