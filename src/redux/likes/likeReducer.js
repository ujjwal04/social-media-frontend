import * as actions from './likeTypes';

const likeOnAPostInitialState = {
  likeDetail: [],
  loading: false,
};

export const likeOnAPostReducer = (state = likeOnAPostInitialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_LIKES_BY_A_USER_INIT:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_ALL_LIKES_BY_A_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        likeDetail: action.payload,
      };
    case actions.GET_ALL_LIKES_BY_A_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actions.LIKE_ON_A_POST_INIT:
      return {
        ...state,
        loading: true,
      };
    case actions.LIKE_ON_A_POST_SUCCESS:
      return {
        ...state,
        likeDetail: [...state.likeDetail, action.payload],
        loading: false,
      };
    case actions.LIKE_ON_A_POST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actions.UNLIKE_ON_A_POST_INIT:
      return {
        ...state,
        loading: true,
      };
    case actions.UNLIKE_ON_A_POST_SUCCESS:
      state.likeDetail = state.likeDetail.filter(
        (like) => like.post_id !== action.payload
      );
      return {
        ...state,
        loading: false,
      };
    case actions.UNLIKE_ON_A_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const likeOnACommentInitialState = {
  likeDetail: null,
  loading: false,
};

export const likeOnACommentReducer = (
  state = likeOnACommentInitialState,
  action
) => {
  switch (action) {
    case actions.LIKE_ON_A_COMMENT_INIT:
      return {
        ...state,
        loading: true,
      };
    case actions.LIKE_ON_A_COMMENT_SUCCESS:
      return {
        ...state,
        likeDetail: action.payload,
        loading: false,
      };
    case actions.LIKE_ON_A_COMMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
