import * as postActions from './postTypes';

const initialState = {
  postDetail: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case postActions.POST_INIT:
      return {
        ...state,
        loading: true,
      };
    case postActions.POST_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        loading: false,
      };
    case postActions.POST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
