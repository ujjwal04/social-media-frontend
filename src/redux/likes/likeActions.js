import axios from './../../utils/axios';
import * as actions from './likeTypes';

export const getAllLikesByUser = () => async (dispatch) => {
  try {
    dispatch(getAllLikesByUserInit());
    const likes = await axios.get(`likes`);
    if (likes) {
      dispatch(getAllLikesByUserSuccess(likes.data.data.likesByUser));
    }
  } catch (error) {
    dispatch(getAllLikesByUserFail(error));
  }
};

const getAllLikesByUserInit = () => {
  return {
    type: actions.GET_ALL_LIKES_BY_A_USER_INIT,
  };
};

const getAllLikesByUserSuccess = (likes) => {
  return {
    type: actions.GET_ALL_LIKES_BY_A_USER_SUCCESS,
    payload: likes,
  };
};

const getAllLikesByUserFail = (error) => {
  return {
    type: actions.GET_ALL_LIKES_BY_A_USER_FAIL,
    payload: error,
  };
};

export const likeOnAPost = (type, emoji, post_id) => async (dispatch) => {
  try {
    dispatch(likeOnAPostInit());
    const like = await axios.post(`posts/${post_id}/likes`, {
      type,
      emoji,
    });
    if (like) {
      dispatch(likeOnAPostSuccess(like.data.data.newLike));
    }
  } catch (error) {
    dispatch(likeOnAPostFail(error));
  }
};

export const unlikeOnAPost = (post_id) => async (dispatch) => {
  try {
    dispatch(unlikeOnAPostInit());
    const unlike = await axios.delete(`posts/${post_id}/likes`);
    if (unlike) {
      dispatch(unlikeOnAPostSuccess(post_id));
    }
  } catch (error) {
    dispatch(unlikeOnAPostFail(error));
  }
};

export const likeOnAComment = (type, emoji, comment_id) => async (dispatch) => {
  try {
    dispatch(likeOnACommentInit());
    const like = await axios.post(`posts/${comment_id}/likes`, {
      type,
      emoji,
    });
    if (like) {
      dispatch(likeOnACommentSuccess(like));
    }
  } catch (error) {
    dispatch(likeOnACommentFail(error));
  }
};

export const likeOnAPostInit = () => {
  return {
    type: actions.LIKE_ON_A_POST_INIT,
  };
};

export const likeOnAPostSuccess = (like) => {
  return {
    type: actions.LIKE_ON_A_POST_SUCCESS,
    payload: like,
  };
};

export const likeOnAPostFail = (error) => {
  return {
    type: actions.LIKE_ON_A_POST_FAIL,
    payload: error,
  };
};

export const unlikeOnAPostInit = () => {
  return {
    type: actions.UNLIKE_ON_A_POST_INIT,
  };
};

export const unlikeOnAPostSuccess = (post_id) => {
  return {
    type: actions.UNLIKE_ON_A_POST_SUCCESS,
    payload: post_id,
  };
};

export const unlikeOnAPostFail = (error) => {
  return {
    type: actions.UNLIKE_ON_A_POST_FAIL,
    payload: error,
  };
};

export const likeOnACommentInit = () => {
  return {
    type: actions.LIKE_ON_A_COMMENT_INIT,
  };
};

export const likeOnACommentSuccess = (like) => {
  return {
    type: actions.LIKE_ON_A_COMMENT_SUCCESS,
    payload: like,
  };
};

export const likeOnACommentFail = (error) => {
  return {
    type: actions.LIKE_ON_A_COMMENT_FAIL,
    payload: error,
  };
};
