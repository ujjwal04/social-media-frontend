import * as actions from './profileTypes';
import * as userActions from './../users/userTypes';
import * as likeActions from './../likes/likeTypes';
import * as postActions from './../posts/postTypes';

let initialState = {
  profileDetail: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_USER_BY_ID_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        profileDetail: action.payload,
        loading: false,
        error: null,
      };
    case actions.GET_USER_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.GET_USER_BY_USER_NAME_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.GET_USER_BY_USER_NAME_SUCCESS:
      return {
        ...state,
        profileDetail: action.payload,
        loading: false,
        error: null,
      };
    case actions.GET_USER_BY_USER_NAME_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case likeActions.LIKE_ON_A_POST_SUCCESS:
      let index;
      if (state.profileDetail) {
        index = state.profileDetail.data.user.posts.findIndex(
          (post) => post.id === action.payload.post_id
        );
        if (index !== -1) state.profileDetail.data.user.posts[index].likes++;
      }
      return {
        ...state,
      };
    case likeActions.UNLIKE_ON_A_POST_SUCCESS:
      let unlikeIndex;
      if (state.profileDetail !== null) {
        unlikeIndex = state.profileDetail.data.user.posts.findIndex((post) => {
          return post.id === action.payload;
        });
        if (unlikeIndex !== -1)
          state.profileDetail.data.user.posts[unlikeIndex].likes--;
      }
      return {
        ...state,
      };
    case postActions.POST_SUCCESS:
      if (state.profileDetail)
        state.profileDetail.data.user.posts.unshift(action.payload);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
