import axios from './../../utils/axios';
import * as actions from './replyTypes';

export const reply = (id, content) => async (dispatch) => {
  try {
    dispatch(replyInit());
    const reply = await axios.post(`comments/${id}/reply`, {
      content,
    });
    if (reply) {
      dispatch(replySuccess(reply));
    }
  } catch (error) {
    dispatch(replyFail(error));
  }
};

export const replyInit = () => {
  return {
    type: actions.REPLY_INIT,
  };
};

export const replySuccess = (reply) => {
  return {
    type: actions.REPLY_SUCCESS,
    payload: reply,
  };
};

export const replyFail = (error) => {
  return {
    type: actions.REPLY_FAIL,
    payload: error,
  };
};
