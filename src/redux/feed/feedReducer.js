import * as feedActions from './feedTypes';
import * as likeActions from './../likes/likeTypes';
import * as postActions from './../posts/postTypes';

const initialState = {
  feedDetail: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case feedActions.FEED_INIT:
      return {
        ...state,
        loading: true,
      };
    case feedActions.FEED_SUCCESS:
      return {
        ...state,
        feedDetail: action.payload,
        loading: false,
      };
    case feedActions.FEED_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case feedActions.FEED_BY_USER_ID_INIT:
      return {
        ...state,
      };
    case feedActions.FEED_BY_USER_ID_SUCCESS:
      return {
        ...state,
        feedDetail: action.payload,
        loading: false,
      };
    case feedActions.FEED_BY_USER_ID_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case likeActions.LIKE_ON_A_POST_SUCCESS:
      let index = state.feedDetail.findIndex(
        (post) => post.id === action.payload.post_id - '0'
      );
      state.feedDetail[index].likes++;
      return {
        ...state,
      };
    case likeActions.UNLIKE_ON_A_POST_SUCCESS:
      let unlikeIndex;
      if (state.feedDetail) {
        unlikeIndex = state.feedDetail.findIndex(
          (post) => post.id === action.payload
        );
        state.feedDetail[unlikeIndex].likes--;
      }
      return {
        ...state,
      };
    case postActions.POST_SUCCESS:
      return {
        ...state,
        feedDetail: [...state.feedDetail, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
