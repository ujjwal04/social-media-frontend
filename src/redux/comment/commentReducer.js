import * as actions from './commentTypes';

const commentInAPostInitialState = {
  commentDetail: null,
  loading: false,
};

export const commentReducer = (state = commentInAPostInitialState, action) => {
  switch (action.type) {
    case actions.COMMENT_ON_A_POST_INIT:
      return {
        ...state,
        loading: true,
      };
    case actions.COMMENT_ON_A_POST_SUCCESS:
      return {
        ...state,
        commentDetail: action.payload,
        loading: false,
      };
    case actions.COMMENT_ON_A_POST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// const getAllCommentsInAPostInitialState = {
//   commentsDetail: null,
//   loading: false,
// };

// export const getAllCommentsInAPostReducer = (
//   state = getAllCommentsInAPostInitialState,
//   action
// ) => {
//   switch (action) {
//     case actions.GET_ALL_COMMENTS_ON_A_POST_INIT:
//       return {
//         ...state,
//         loading: true,
//       };
//     case actions.GET_ALL_COMMENTS_ON_A_POST_SUCCESS:
//       return {
//         ...state,
//         comments: action.payload,
//         loading: false,
//       };
//     case actions.GET_ALL_COMMENTS_ON_A_POST_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };
