import axios from './../../utils/axios';
import * as actions from './commentTypes';

export const commentOnAPost = (id, content) => async (dispatch) => {
  try {
    dispatch(commentInit());
    const comment = await axios.post(`posts/${id}/comments`, {
      content,
    });
    if (comment) {
      dispatch(commentSuccess(comment));
    }
  } catch (error) {
    dispatch(commentFail(error));
  }
};

// export const getAllCommentOnAPost = (post_id) => async (dispatch) => {
//   try {
//     dispatch(getAllCommentOnAPostInit());
//     const comments = await axios.get(`posts/${post_id}/comments`, {
//       content,
//     });
//     if (comments) {
//       dispatch(getAllCommentOnAPostSuccess(comments));
//     }
//   } catch (error) {
//     dispatch(getAllCommentOnAPostFail(error));
//   }
// };

export const commentInit = () => {
  return {
    type: actions.COMMENT_ON_A_POST_INIT,
  };
};

export const commentSuccess = (comment) => {
  return {
    type: actions.COMMENT_ON_A_POST_SUCCESS,
    payload: comment,
  };
};

export const commentFail = (error) => {
  return {
    type: actions.COMMENT_ON_A_POST_FAIL,
    payload: error,
  };
};

export const getAllCommentOnAPostInit = () => {
  return {
    type: actions.GET_ALL_COMMENTS_ON_A_POST_INIT,
  };
};

export const getAllCommentOnAPostSuccess = (comments) => {
  return {
    type: actions.GET_ALL_COMMENTS_ON_A_POST_SUCCESS,
    payload: comments,
  };
};

export const getAllCommentOnAPostFail = (error) => {
  return {
    type: actions.GET_ALL_COMMENTS_ON_A_POST_FAIL,
    payload: error,
  };
};
