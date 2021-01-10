import axios from './../../utils/axios';
import * as actions from './postTypes';

export const post = (content, image) => async (dispatch) => {
  try {
    dispatch(postInit());
    const post = await axios.post('posts', {
      content,
      image,
    });
    if (post) {
      dispatch(postSuccess(post.data.data.newAssociatedPost));
    }
  } catch (error) {
    dispatch(postFail(error));
  }
};

export const postInit = () => {
  return {
    type: actions.POST_INIT,
  };
};

export const postSuccess = (post) => {
  return {
    type: actions.POST_SUCCESS,
    payload: post,
  };
};

export const postFail = (error) => {
  return {
    type: actions.POST_FAIL,
    payload: error,
  };
};
