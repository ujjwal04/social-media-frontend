import * as actions from './replyTypes';

const initialState = {
  replyDetail: null,
  loading: false,
};

const replyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REPLY_INIT:
      return {
        ...state,
        loading: true,
      };
    case actions.REPLY_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case actions.REPLY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default replyReducer;
